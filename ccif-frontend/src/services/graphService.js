import api from "./api";
import { graphData } from "../data/mockData";

function normalizeGraph(data) {
  return {
    nodes: data.nodes.map((node) => ({
      ...node,
      data: {
        ...node.data,
        type: node.data.type || node.data.group,
        risk: node.data.risk || 72,
      },
    })),
    edges: data.edges.map((edge) => ({
      ...edge,
      data: {
        ...edge.data,
        label: edge.data.label || edge.data.relationship || "related",
        confidence: edge.data.confidence || 50,
      },
    })),
  };
}

export const graphService = {
  async getGraph() {
    try {
      const response = await api.get("/graph/network");
      return { ...normalizeGraph(response.data), isMock: false };
    } catch (error) {
      console.error("Graph fetch failed, using mock data:", error);
      return { ...normalizeGraph(graphData), isMock: true };
    }
  },

  async expandNode(id) {
    try {
      const response = await api.get(`/graph/${id}`);
      return response.data;
    } catch (error) {
      console.error("Expand node failed:", error);
      return null;
    }
  },
};