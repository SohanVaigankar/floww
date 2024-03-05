"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import ReactFlow, {
  addEdge,
  Position,
  MarkerType,
  useEdgesState,
  useNodesState,
  ReactFlowProvider,
  type Node,
  type Connection,
  type ReactFlowInstance,
} from "reactflow";
import { v4 } from "uuid";
// components
import { Header, NodeCard } from "@atoms";
import { Panel } from "@molecules";

// utils & static data
import { initialEdges, initialNodes } from "../../../utils/staticData";
// styles
import "reactflow/dist/style.css";
import classes from "./FlowBuilderContent.module.scss";

// Node Type for custom node
const nodeTypes = { nodeHeader: NodeCard };

const FlowBuilderContent = () => {
  const reactFlowWrapper = useRef(null);

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [reactFlowInstance, setReactFlowInstance] =
    useState<ReactFlowInstance | null>(null);

  const [selectedNode, setSelectedNode] = useState<Node | undefined>(undefined);
  const [showSettings, setShowSettings] = useState<boolean>(false);

  const handleUpdate = (updatedNodes: Node[]) => {
    setNodes(updatedNodes);
  };

  // trigger when nodes are connected to one another
  const onConnect = useCallback(
    (params: Connection) =>
      setEdges((item) =>
        addEdge(
          {
            ...params,
            markerEnd: { type: MarkerType.ArrowClosed },
          },
          item
        )
      ),
    [setEdges]
  );

  // Node Drag n Drop
  const onDragOver = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();

      const type = event.dataTransfer.getData("application/reactflow");

      if (typeof type === "undefined" || !type) {
        return;
      }

      // Check drop position
      const position = reactFlowInstance?.screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      }) ?? { x: 0, y: 0 };

      // Creating new node
      const newNode: Node = {
        id: v4(),
        position,
        type: "nodeHeader",
        data: { heading: "Send message", label: "this is a text node" },
        sourcePosition: Position.Right,
        targetPosition: Position.Left,
      };

      setNodes((prev) => prev.concat(newNode));
    },
    [reactFlowInstance, setNodes]
  );

  // Store selected node data to state
  const onNodeClick = (_: React.MouseEvent, node: Node): void => {
    setSelectedNode(node);
  };

  useEffect(() => {
    const isSelected = nodes.some((item) => item.selected === true);
    setShowSettings(!isSelected);
  }, [nodes]);

  return (
    <div className={classes.FlowBuilderContent}>
      <Header nodes={nodes} edges={edges} />
      <div className={classes.FlowCanvasContainer}>
        <ReactFlowProvider>
          <div className={classes.FlowCanvas} ref={reactFlowWrapper}>
            <ReactFlow
              nodes={nodes}
              edges={edges}
              onNodesChange={onNodesChange}
              onNodeClick={onNodeClick}
              onEdgesChange={onEdgesChange}
              onConnect={onConnect}
              onInit={setReactFlowInstance}
              onDrop={onDrop}
              onDragOver={onDragOver}
              nodeTypes={nodeTypes}
            />
          </div>

          <Panel
            selectedNode={selectedNode}
            onNodeUpdate={handleUpdate}
            showSettings={showSettings}
          />
        </ReactFlowProvider>
      </div>
    </div>
  );
};

export default FlowBuilderContent;
