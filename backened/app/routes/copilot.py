import json
import os
import urllib.error
import urllib.request

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

router = APIRouter()


class CopilotQuery(BaseModel):
    query: str


@router.post("/query")
def copilot_query(payload: CopilotQuery):
    api_key = os.getenv("ANTHROPIC_API_KEY")
    if not api_key:
        raise HTTPException(status_code=500, detail="Missing ANTHROPIC_API_KEY environment variable")

    messages_payload = {
        "model": "claude-sonnet-4-6",
        "max_tokens": 1024,
        "messages": [{"role": "user", "content": payload.query}],
    }

    request = urllib.request.Request(
        "https://api.anthropic.com/v1/messages",
        data=json.dumps(messages_payload).encode("utf-8"),
        headers={
            "Content-Type": "application/json",
            "x-api-key": api_key,
            "anthropic-version": "2023-06-01",
        },
        method="POST",
    )

    try:
        with urllib.request.urlopen(request, timeout=30) as response:
            response_body = response.read().decode("utf-8")
    except urllib.error.HTTPError as exc:
        try:
            error_text = exc.read().decode("utf-8")
        except Exception:
            error_text = str(exc)
        raise HTTPException(status_code=exc.code, detail=error_text)
    except Exception as exc:
        raise HTTPException(status_code=502, detail=str(exc))

    try:
        data = json.loads(response_body)
        response_text = data["content"][0]["text"]
    except (json.JSONDecodeError, KeyError, IndexError):
        raise HTTPException(status_code=502, detail="Unable to decode response from Anthropic")

    return {"query": payload.query, "response": response_text}
