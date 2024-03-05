import { Position, MarkerType, type Node } from "reactflow";

export const initialNodes: Node[] = [
  {
    id: "1",
    position: { x: 20, y: 50 },
    type: "nodeHeader",
    data: { heading: "Send Message", label: "text node 1" },
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
  },
  {
    id: "2",
    position: { x: 300, y: 100 },
    type: "nodeHeader",
    data: { heading: "Send Message", label: "text node 2" },
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
  },
  {
    id: "3",
    position: { x: 600, y: 150 },
    type: "nodeHeader",
    data: { heading: "Send Message", label: "text node 3" },
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
  },
];

export const initialEdges = [
  {
    id: "e1-2",
    source: "1",
    target: "2",
    // markerEnd: {
    //   type: MarkerType.ArrowClosed,
    // },
  },
  {
    id: "e2-3",
    source: "2",
    target: "3",
    markerEnd: {
      type: MarkerType.ArrowClosed,
    },
  },
];
