'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';

import { ChatContext } from './chat-context';
import { GroupRecipients } from './group-recipients';
import { MessageAdd } from './message-add';
import { paths } from '/src/paths';
import useAuth from '@/hooks/useAuth';
import { OutlinedInput } from '@mui/material';
import Typography from '@mui/material/Typography';
function useRecipients() {
  const [recipients, setRecipients] = React.useState([]);

  const handleRecipientAdd = React.useCallback((recipient) => {
    setRecipients((prevState) => {
      const found = prevState.find((_recipient) => _recipient.id === recipient.id);

      if (found) {
        return prevState;
      }

      return [...prevState, recipient];
    });
  }, []);

  const handleRecipientRemove = React.useCallback((recipientId) => {
    setRecipients((prevState) => {
      return prevState.filter((recipient) => recipient.id !== recipientId);
    });i
  }, []);

  return { handleRecipientAdd, handleRecipientRemove, recipients };
}

export function ComposeView() {
  const router = useRouter();
  const { userInfo } = useAuth();

  const { contacts, createThread, createMessage } = React.useContext(ChatContext);

  const { handleRecipientAdd, handleRecipientRemove, recipients } = useRecipients();
  const [groupName, setGroupName] = React.useState('');

  const handleSendMessage = React.useCallback(
    async (type, content) => {
      if (!groupName.trim()) {
        alert('Please provide a group name.');
        return;
      }
      const recipientIds = recipients.map((recipient) => recipient.id);
  
      // Include the group creator in the participants
      const allParticipants = [...recipientIds, userInfo?.email]; 
  
    
      let initialMessage = {
        authorId: userInfo?.email,
        content,
        type: 'TEXT',
      };
  
      // Create a new thread
      const threadId = await createThread({ type: 'GROUP', recipientIds: allParticipants, name:groupName, initialMessage:initialMessage });
  
     
  
      createMessage({ threadId, type, content });
  
      // Navigate to the created thread
      router.push(paths.dashboard.chat + '/' + 'group' + '/' + threadId);
    },
    [router, createThread, createMessage, recipients, userInfo,groupName]
  );
  

  return (
    <Box sx={{ display: 'flex', flex: '1 1 auto', flexDirection: 'column', minHeight: 0 }}>
       <OutlinedInput
          placeholder="Enter group name"
          onChange={(e) => setGroupName(e.target.value)}
          sx={{ minWidth: '100px', maxWidth: '300px',mt:2 ,ml:2}}
          value={groupName}

        />
         <Typography variant="body2" color="text.secondary" sx={{ mb: 1 , p:2}}>
          Add members to the group
        </Typography>
      <GroupRecipients
        contacts={contacts}
        onRecipientAdd={handleRecipientAdd}
        onRecipientRemove={handleRecipientRemove}
        recipients={recipients}
      />
      <Divider />
      <Box sx={{ flex: '1 1 auto' }} />
      <Divider />
      <MessageAdd disabled={recipients.length < 1 || !groupName.trim()}  onSend={handleSendMessage} />
    </Box>
  );
}
