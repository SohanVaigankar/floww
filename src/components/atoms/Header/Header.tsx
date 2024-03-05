import React, { useState } from "react";
import type { Node, Edge } from "reactflow";
// components
import Button from "../Button/Button";
// styles
import classes from "./Header.module.scss";

type HeaderProps = {
  nodes: Node[];
  edges: Edge[];
};

const Header = (props: HeaderProps) => {
  const { nodes, edges } = props;

  const [error, setError] = useState<boolean>(false);
  const [isSaved, setIsSaved] = useState<boolean>(false);

  const handleOnSave = () => {
    // node ids and source ids
    const nodeIDs = nodes.map((node) => node.id);
    const sourceIds = edges.map((edge) => edge.source);
    let count = 0;

    // checking if node id is present in source node list
    nodeIDs.forEach((item) => {
      if (!sourceIds.includes(item)) count++;
    });

    setTimeout(() => {
      setError(false);
      setIsSaved(false);
    }, 3000);

    if (count >= 2) {
      setError(true);
      return false;
    }

    setError(false);
    setIsSaved(true);

    return null;
  };

  return (
    <nav className={classes.Header}>
      <div className={classes.Status}>
        {error && <span className={classes.Error}>Cannot save the flow</span>}
        {isSaved && <span className={classes.Success}>Saved</span>}
      </div>

      <Button onClick={handleOnSave}>Save Changes</Button>
    </nav>
  );
};

export default Header;
