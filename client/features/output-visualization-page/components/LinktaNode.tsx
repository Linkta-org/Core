import React, { memo } from 'react';
import type { NodeProps } from 'reactflow';
import { Handle, Position } from 'reactflow';
import { Box, Typography } from '@mui/material';
import { DragIndicator, ExpandCircleDownOutlined } from '@mui/icons-material';
import styles from '@styles/LinktaFlow.module.css';

type LinktaNodeData = {
  color?: string;
  label?: string;
  id: string;
};

type LinktaNodeProps = NodeProps<LinktaNodeData> & {
  isConnectable: boolean;
};

const LinktaNode = memo(({ isConnectable, data }: LinktaNodeProps) => {
  const expandNode = () => {
    console.log('NODE BUTTON');
  };

  return (
    <Box className={`${styles.node}`}>
      <Box className={styles.nodeGrabHandle}>
        <DragIndicator className={`${styles.dragIndicator}`} />
      </Box>
      <Typography className={`${styles.nodeLabel}`}>{data.label}</Typography>
      <Box className={`${styles.nodeButtonContainer}`}>
        <ExpandCircleDownOutlined
          onClick={expandNode}
          className={`${styles.nodeButton}`}
        />
      </Box>
      <Handle
        type='target'
        position={Position.Top}
        id='d'
        className={styles.anchor}
        isConnectable={isConnectable}
      />
      <Handle
        type='source'
        position={Position.Bottom}
        id='a'
        className={styles.anchor}
        isConnectable={isConnectable}
      />
    </Box>
  );
});

LinktaNode.displayName = 'LinktaNode';
export default LinktaNode;
