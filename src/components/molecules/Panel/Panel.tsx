"use client";

import { useEffect, useState } from "react";
import { useNodes, type Node } from "reactflow";
// styles
import classes from "./Panel.module.scss";
// assets
import { MessageSVG } from "@assets";

type PanelProps = {
  selectedNode: Node | undefined;
  onNodeUpdate: (node: Node[]) => void;
  showSettings: boolean;
};

const Panel = (props: PanelProps) => {
  const { selectedNode, onNodeUpdate, showSettings } = props;

  const [textAreaContent, setTextAreaContent] = useState<string>("");
  const [showTextArea, setShowTextArea] = useState<boolean>(false);

  const nodes = useNodes();

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTextAreaContent(e.target.value);

    // Check if a node is selected
    if (selectedNode) {
      const updatedNodes = nodes.map((node) => {
        if (node.id === selectedNode?.id) {
          if (e.target.value.trim() !== "") {
            return {
              ...node,
              data: { ...(node?.data as Node), label: e.target.value },
            };
          } else {
            return node;
          }
        }
        return node;
      });
      onNodeUpdate(updatedNodes);
    }
  };

  // Function to hide the text area when input is blurred
  const handleOnBlur = () => {
    setShowTextArea(false);
    setTextAreaContent("");
  };

  const handleOnClick = (type: string) => {
    if (type === "back") {
      setShowTextArea(false);
      setTextAreaContent("");
    }
  };

  // Function to handle drag start events
  const onDragStart = (
    event: React.DragEvent<HTMLDivElement>,
    nodeType: string
  ) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  // Effect to update the text area content and visibility when the selected node changes
  useEffect(() => {
    setTextAreaContent(selectedNode?.data?.label);
    if (selectedNode) {
      setShowTextArea(!showTextArea);
    } else {
      setShowTextArea(!showTextArea);
    }
  }, [selectedNode]);

  // Effect to hide the text area when showSettings state changes
  useEffect(() => {
    if (showSettings) setShowTextArea(false);
  }, [showSettings]);

  return (
    <div className={classes.Panel}>
      {showTextArea && !showSettings ? (
        <>
          <div className={classes.PanelHeader}>
            <span
              className={classes.BackArrow}
              onClick={() => handleOnClick("back")}
            >
              {`<-`}
            </span>
            <span className={classes.MessageType}>Message</span>
          </div>
          <div className={classes.PanelTextarea}>
            <label htmlFor="text">Text</label>
            <textarea
              name="text"
              cols={20}
              rows={5}
              value={textAreaContent}
              onChange={handleChange}
              onBlur={handleOnBlur}
            />
          </div>
        </>
      ) : (
        <div className={classes.SupportedNodesList}>
          <div
            className={classes.MessageBtn}
            onDragStart={(event) => onDragStart(event, "input")}
            draggable
          >
            <MessageSVG className={classes.MessageIcon} />
            <span>Message</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Panel;
