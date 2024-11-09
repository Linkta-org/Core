import React, { memo, useState } from 'react';
import type { NodeProps } from 'reactflow';
import { Handle, Position } from 'reactflow';
import { Box, Paper, Typography, IconButton } from '@mui/material';
import { DragIndicator, ExpandCircleDownOutlined } from '@mui/icons-material';
import styles from '@styles/LinktaFlow.module.css';
import OptionsMenu from '@/components/layout/OptionsMenu';

type LinktaNodeData = {
  color?: string;
  label?: string;
  id: string;
};

type LinktaNodeProps = NodeProps<LinktaNodeData> & {
  isConnectable: boolean;
};

const LinktaNode = memo(({ isConnectable, data }: LinktaNodeProps) => {
  const [optionsMenuAnchor, setOptionsMenuAnchor] =
    useState<null | HTMLElement>(null);
  const handleOptionsIconClick = (event: React.MouseEvent<HTMLElement>) => {
    const parentElement = event.currentTarget.parentNode as HTMLElement;
    setOptionsMenuAnchor(parentElement);
  };
  const isOptionsMenuOpen = Boolean(optionsMenuAnchor);
  const [isRenamingDialogOpen, setIsRenamingDialogOpen] = useState(false);
  const [isDeletionDialogOpen, setIsDeletionDialogOpen] = useState(false);
  const handleLiktaFlowRegeneration = () => {
    console.log('Placeholder for handleLiktaFlowRegeneration');
  };

  console.log({ isRenamingDialogOpen, isDeletionDialogOpen });

  return (
    <Paper
      elevation={10}
      className={`${styles.node}`}
    >
      <Box className={`${styles.dragHandle} dragHandle`}>
        <DragIndicator className={`${styles.dragIndicator}`} />
      </Box>
      <Typography className={`${styles.nodeLabel}`}>{data.label}</Typography>
      <Box className={`${styles.nodeButtonContainer}`}>
        <IconButton
          size='small'
          aria-label='expand node'
          onClick={handleOptionsIconClick}
          className={`${styles.nodeButton}`}
        >
          <ExpandCircleDownOutlined />
        </IconButton>
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
      <OptionsMenu
        // arialabelledby={`user-input-button-${activeUserInput?.id}`}
        arialabelledby={`user-input-button-TBD`}
        anchorEl={optionsMenuAnchor}
        isOpen={isOptionsMenuOpen}
        onClose={() => setOptionsMenuAnchor(null)}
        onRename={() => setIsRenamingDialogOpen(true)}
        onRegenerate={handleLiktaFlowRegeneration}
        onDelete={() => setIsDeletionDialogOpen(true)}
      />
    </Paper>
  );
});

LinktaNode.displayName = 'LinktaNode';
export default LinktaNode;
