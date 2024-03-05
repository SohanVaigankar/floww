import React from "react";
import { Handle, Position } from "reactflow";
// styles
import classes from "./NodeCard.module.scss";
// assets
import { MessageSVG, WhatsappSVG } from "@assets";

type NodeCardProps = {
  data: {
    heading: string;
    label: string;
  };
  isConnectable: boolean;
};

const NodeCard = (props: NodeCardProps) => {
  const { data, isConnectable } = props;

  return (
    <div className={classes.NodeCardContainer}>
      <div className={classes.NodeHeader}>
        <MessageSVG />
        <span>{data?.heading}</span>
        <WhatsappSVG />
      </div>

      <div className={classes.NodeContent}>{data?.label}</div>
      <Handle
        type="source"
        position={Position.Right}
        id="a"
        isConnectable={isConnectable}
      />
      <Handle
        type="target"
        position={Position.Left}
        id="b"
        isConnectable={isConnectable}
      />
    </div>
  );
};

export default NodeCard;
