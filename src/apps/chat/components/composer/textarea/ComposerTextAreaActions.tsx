import * as React from 'react';

import type { SxProps } from '@mui/joy/styles/types';
import { Box, Sheet } from '@mui/joy';

import type { AgiAttachmentPromptsData } from '~/modules/aifn/attachmentprompts/useAgiAttachmentPrompts';

import type { DMetaReferenceItem } from '~/common/stores/chat/chat.message';

import { InReferenceToBubble } from '../../message/InReferenceToBubble';
import { AttachmentsPromptsButton } from './AttachmentsPromptsButton';


// Styles

const textAreaSx: SxProps = {
  flex: 1,
  // marginBottom: 0.5,
  // margin: 1,
  // marginTop: 0,

  // layout
  display: 'grid',
  justifyItems: 'start',
  gap: 1,

  // Buttons
  [`& button`]: {
    '--Button-gap': '1.2rem',
    transition: 'background-color 0.2s, color 0.2s',
    // minWidth: 160,
  },
};

const suggestedPromptSx: SxProps = {
  placeSelf: 'end',
  // width: '100%',
  backgroundColor: 'background.surface',
  border: '1px solid',
  borderColor: 'primary.outlinedBorder',
  borderRadius: '2rem',
  borderTopRightRadius: 0,
  px: 1.5,
  py: 0.5,
  fontSize: 'sm',
  cursor: 'pointer',
  '&:hover': {
    backgroundColor: 'primary.solidBg',
    color: 'primary.solidColor',
  },
};


export function ComposerTextAreaActions(props: {
  agiAttachmentPrompts: AgiAttachmentPromptsData,
  inReferenceTo?: DMetaReferenceItem[] | null
  onAppendAndSend: (appendText: string) => Promise<void>,
  onRemoveReferenceTo: (item: DMetaReferenceItem) => void,
}) {

  // skip the component if there's nothing to show
  const { agiAttachmentPrompts } = props;
  if (!agiAttachmentPrompts.prompts?.length && !props.agiAttachmentPrompts.isVisible && !props.inReferenceTo?.length)
    return null;

  return (

    <Box sx={textAreaSx}>

      {/* In-Reference-To bubbles */}
      {props.inReferenceTo?.map((item, index) => (
        <InReferenceToBubble
          key={index}
          item={item}
          onRemove={props.onRemoveReferenceTo}
          className='in-reference-to-bubble'
        />
      ))}

      {/* Auto-Prompts from attachments */}
      {agiAttachmentPrompts.prompts.map((candidate, index) =>
        <Sheet
          key={index}
          color='primary'
          variant='soft'
          onClick={() => props.onAppendAndSend(candidate)}
          sx={suggestedPromptSx}
        >
          {candidate}
        </Sheet>,
      )}

      {/* Guess Action Button */}
      {(agiAttachmentPrompts.isVisible || agiAttachmentPrompts.hasData) && (
        <AttachmentsPromptsButton data={props.agiAttachmentPrompts} />
      )}

    </Box>
  );
}
