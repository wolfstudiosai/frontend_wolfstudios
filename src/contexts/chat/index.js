import { createContext, useEffect, useState } from 'react';

import { useSocket } from '/src/contexts/socket';
import useAuth from '/src/hooks/useAuth';

import { DEMO_CONVERSATIONS, DEMO_USERS } from '/src/mock_data';
import { chatApi } from '/src/utils/api';

const loggedInUser = {
  userId: 'u1',
  name: 'Combina Key',
  profile_image: 'https://i.pravatar.cc/150?img=4',
  last_message: {
    message: 'The quick brown fox jumps over the lazy dog.',
    timestamp: '2025-02-23T21:11:00Z',
  },
  active: true,
  bookmark: false,
};

export const ChatContext = createContext({});

export const ChatProvider = ({ children }) => {
  const { userInfo } = useAuth();
  const [userData, setUserData] = useState(DEMO_USERS);
  const [activeConversation, setActiveConversation] = useState(
    DEMO_CONVERSATIONS[`u1-${DEMO_USERS[0].userId}`].messages
  );
  const [activeReceiver, setActiveReceiver] = useState(null);
  const [activeThread, setActiveThread] = useState(null);
  const [activeProfile, setActiveProfile] = useState(null);
  const [messages, setMessages] = useState([]);
  const [replies, setReplies] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [workspaceInfo, setWorkspaceInfo] = useState({
    id: null,
    name: null,
    slug: null,
    members: [],
  });
  const [messageContent, setMessageContent] = useState('');
  const [channels, setChannels] = useState([]);
  const [directChannels, setDirectChannels] = useState([]);
  const [activeTab, setActiveTab] = useState(null);
  const [activeTabInfo, setActiveTabInfo] = useState(null);
  const [channelMessages, setChannelMessages] = useState([]);
  const [directMessages, setDirectMessages] = useState([]);
  const [activeChannelThread, setActiveChannelThread] = useState(null);
  const [channelThreadMessages, setChannelThreadMessages] = useState([]);
  const [activeDirectThread, setActiveDirectThread] = useState(null);
  const [directThreadMessages, setDirectThreadMessages] = useState([]);
  const [typingUsers, setTypingUsers] = useState(new Set());
  const [notifications, setNotifications] = useState({});
  const [messageIdToEdit, setMessageIdToEdit] = useState(null);
  const socketContext = useSocket();

  const findUser = (id) => {
    if (id === loggedInUser.userId) return loggedInUser;
    return userData.find((user) => user.userId === id);
  };

  const handleActiveConversation = (id) => {
    const user = userData.find((u) => u.id === id);
    setActiveReceiver(user);
    setActiveConversation(DEMO_CONVERSATIONS[`u1-${id}`]?.messages);
  };

  const handleActiveThread = (messageId) => {
    if (!messageId) {
      setActiveThread(null);
      return;
    }
    const message = DEMO_CONVERSATIONS['u1-u2']?.messages.find((m) => m.messageId === messageId);
    if (message) {
      const thread = message?.thread_conversation;
      if (thread) {
        setActiveThread(thread);
        setActiveProfile(null);
      } else {
        setActiveThread([message]);
        setActiveProfile(null);
      }
    }
  };

  const handleSearchUser = (searchTerm) => {
    const result = DEMO_USERS.filter((user) => user.name.toLowerCase().includes(searchTerm.toLowerCase()));
    setUserData(result);
  };

  const handleActiveUser = (active) => {
    if (active) {
      const result = DEMO_USERS.filter((user) => user.active === active);
      setUserData(result);
    } else {
      setUserData(DEMO_USERS);
    }
  };

  const handleAddMessage = () => {
    console.log('add message handler');
  };

  // Set message in the form for edit
  const handleEditMessage = (message) => {
    if (message?.id) {
      setMessageContent(message?.content);
      setMessageIdToEdit(message?.id);
    } else {
      setMessageContent('');
      setMessageIdToEdit(null);
    }
  };

  const handleActiveProfile = (userID) => {
    console.log(userID);
    if (userID) {
      const profile =
        DEMO_USERS.find((user) => user.userId === userID) || (loggedInUser.userId === userID && loggedInUser);

      if (profile) {
        setActiveThread(null);
        setActiveProfile(profile);
      }
    } else {
      setActiveProfile(null);
    }
  };

  const handleReplies = (msgID) => {
    if (msgID) {
      setReplies(msgID);
    } else {
      setReplies(null);
    }
  };

  const handleSelectedUser = (user) => {
    if (user) {
      setSelectedUser(user);
    } else {
      setSelectedUser(null);
    }
  };

  const playNotificationSound = () => {
    const audio = new Audio('/notification.mp3');
    audio.play();
  };

  const getWorkspace = async (slug) => {
    try {
      const workspace = userInfo?.workspaces.find((workspace) => workspace.slug === slug);
      if (!workspace || !workspace?.id) throw new Error('Workspace not found');
      const response = await chatApi.get(`/workspaces/${workspace.id}`);
      if (response.data && response.data?.success) {
        const data = response.data.data;
        setChannels(data?.Channels || []);
        setDirectChannels(data?.DirectChannels || []);
        setWorkspaceInfo({
          id: data?.id,
          name: data?.name,
          slug: data?.slug,
          members: data?.WorkspaceMembers?.map((member) => member.User)?.filter(
            (member) => member?.id !== userInfo?.id
          ),
        });
        setActiveTab({ type: 'channel', id: data?.Channels[0]?.id });
      }
    } catch (error) {
      console.error('Error fetching workspace:', error);
    }
  };

  const getChannel = async (id) => {
    try {
      const response = await chatApi.get(`/channels/${id}`);
      if (response.data && response.data?.success) {
        const data = response.data.data;
        setActiveTabInfo({
          id: data?.id,
          name: data?.name,
          type: data?.type,
          createdAt: data?.createdAt,
          createdBy: data?.Owner,
          members: data?.ChannelMembers,
        });
        if (socketContext?.connected) {
          socketContext.joinChannel(id);
        }
      }
    } catch (error) {
      console.error('Error fetching channel:', error);
    }
  };

  const getChannelMessages = async (id) => {
    try {
      const response = await chatApi.get(`/channel-messages?channelId=${id}`);
      if (response.data) {
        const data = response.data?.data?.data;
        setChannelMessages(data?.length > 0 ? data?.reverse() : []);

        setNotifications((prev) => {
          const obj = { ...prev };
          obj[id] = 0;
          return obj;
        });
      }
    } catch (error) {
      console.error('Error fetching channel messages:', error);
      setChannelMessages([]);
    }
  };

  const getChannelThreadMessages = async (id) => {
    try {
      const response = await chatApi.get(`/channel-messages/thread/${id}`);
      if (response.data) {
        const data = response.data?.data?.data;
        setChannelThreadMessages(data?.length > 0 ? data?.reverse() : []);
      }
    } catch (error) {
      console.error('Error fetching channel messages:', error);
      setChannelThreadMessages([]);
    }
  };

  const getDirectChannel = async (id) => {
    try {
      const response = await chatApi.get(`/direct-channels/${id}`);
      if (response.data && response.data?.success) {
        const data = response.data.data;
        setActiveTabInfo({
          id: data?.id,
          sender: data?.Sender,
          receiver: data?.Receiver,
          createdAt: data?.createdAt,
        });
        if (socketContext?.connected) {
          socketContext.joinDirectChannel(id);
        }
      }
    } catch (error) {
      console.error('Error fetching channel:', error);
    }
  };

  const createChannel = async ({ name, type, members }) => {
    socketContext?.createChannel({
      name,
      type,
      members,
      workspaceId: workspaceInfo?.id,
    });
  };

  const createChannelMessage = async (message) => {
    socketContext?.sendChannelMessage({ channelId: activeTab.id, message });
  };

  const createChannelReaction = async (messageId, emoji) => {
    socketContext?.reactToChannelMessage({ channelId: activeTab.id, messageId, emoji });
  };

  const removeChannelReaction = async (messageId, emoji) => {
    socketContext?.removeChannelReaction({ channelId: activeTab.id, messageId, emoji });
  };

  const deleteChannelMessage = async (messageId) => {
    socketContext?.deleteChannelMessage({ channelId: activeTab.id, messageId });
  };

  const editChannelMessage = async (messageId, content) => {
    socketContext?.editChannelMessage({ channelId: activeTab.id, messageId, content });
  };

  const startTyping = () => {
    socketContext?.startTyping(activeTabInfo?.id);
  };

  const stopTyping = () => {
    socketContext?.stopTyping(activeTabInfo?.id);
  };

  const getDirectMessages = async (id) => {
    try {
      const response = await chatApi.get(`/direct-messages?directChannelId=${id}`);
      if (response.data) {
        const data = response.data?.data?.data;
        setDirectMessages(data?.length > 0 ? data?.reverse() : []);

        setNotifications((prev) => {
          const obj = { ...prev };
          obj[id] = 0;
          return obj;
        });
      }
    } catch (error) {
      console.error('Error fetching channel messages:', error);
      setDirectMessages([]);
    }
  };

  const getDirectThreadMessages = async (id) => {
    try {
      const response = await chatApi.get(`/direct-messages/thread/${id}`);
      if (response.data) {
        const data = response.data?.data?.data;
        setDirectThreadMessages(data?.length > 0 ? data?.reverse() : []);
      }
    } catch (error) {
      console.error('Error fetching channel messages:', error);
      setDirectThreadMessages([]);
    }
  };

  const createDirectMessage = async (message) => {
    socketContext?.sendDirectMessage({ directChannelId: activeTab.id, message });
  };

  const editDirectMessage = async (messageId, content) => {
    socketContext?.editDirectMessage({ directChannelId: activeTab.id, messageId, content });
  };

  const deleteDirectMessage = async (messageId) => {
    socketContext?.deleteDirectMessage({ directChannelId: activeTab.id, messageId });
  };

  const createDirectChannel = async (receiverId) => {
    socketContext?.createDirectChannel({ receiverId, workspaceId: workspaceInfo?.id });
  };

  const createDirectMessageReaction = async (messageId, emoji) => {
    socketContext?.reactToDirectMessage({ directChannelId: activeTab.id, messageId, emoji });
  };

  const removeDirectMessageReaction = async (messageId, emoji) => {
    socketContext?.removeDirectMessageReaction({ directChannelId: activeTab.id, messageId, emoji });
  };

  useEffect(() => {
    if (activeTab?.type === 'channel') {
      setDirectMessages([]);
      Promise.all([getChannel(activeTab.id), getChannelMessages(activeTab.id)]);
    }
    if (activeTab?.type === 'direct') {
      setChannelMessages([]);
      Promise.all([getDirectChannel(activeTab.id), getDirectMessages(activeTab.id)]);
    }
  }, [activeTab]);

  useEffect(() => {
    if (activeChannelThread) {
      setDirectThreadMessages([]);
      getChannelThreadMessages(activeChannelThread);
    }
    if (activeDirectThread) {
      setChannelThreadMessages([]);
      getDirectThreadMessages(activeDirectThread);
    }
  }, [activeChannelThread, activeDirectThread]);

  useEffect(() => {
    if (socketContext?.socket && activeTab) {
      // Define the event handlers

      const handleCreateChannel = (data) => {
        setChannels((prev) => [...prev, data]);
      };

      const handleChannelMessageSend = (data) => {
        if (data && data?.channelId === activeTab?.id) {
          setChannelMessages((prev) => [...prev, data]);
        }
      };

      const handleChannelMessageReceive = (data) => {
        playNotificationSound();

        if (data && data?.channelId === activeTab?.id) {
          setChannelMessages((prev) => [...prev, data]);
        } else {
          setNotifications((prev) => ({
            ...prev,
            [data?.channelId]: (prev[data?.channelId] || 0) + 1,
          }));
        }
      };

      const handleDirectMessageSend = (data) => {
        if (data && data?.directChannelId === activeTab?.id) {
          setDirectMessages((prev) => [...prev, data]);
        }
      };

      const handleDirectMessageReceive = (data) => {
        playNotificationSound();
        if (data && data?.directChannelId === activeTab?.id) {
          setDirectMessages((prev) => [...prev, data]);
        } else {
          setNotifications((prev) => ({
            ...prev,
            [data?.directChannelId]: (prev[data?.directChannelId] || 0) + 1,
          }));
          playNotificationSound();
        }
      };

      const handleStartTyping = (data) => {
        if (data && data?.channelId === activeTab?.id) {
          setTypingUsers((prev) => {
            const newSet = new Set(prev);
            newSet.add(data?.userId);
            return newSet;
          });
        }
      };

      const handleStopTyping = (data) => {
        if (data && data?.channelId === activeTab?.id) {
          setTypingUsers((prev) => {
            const newSet = new Set(prev);
            newSet.delete(data?.userId);
            return newSet;
          });
        }
      };

      const handleCreateChannelReaction = (data) => {
        playNotificationSound();

        if (data && data?.channelId === activeTab?.id) {
          setChannelMessages((prev) => {
            const arr = [...prev];
            const index = arr.findIndex((message) => message.id === data?.messageId);
            if (index !== -1) {
              arr[index].Reactions = [...(arr[index]?.Reactions || []), data];
            }
            return arr;
          });
        }
      };

      const handleDeleteChannelReaction = (data) => {
        if (data && data?.channelId === activeTab?.id) {
          setChannelMessages((prev) => {
            const arr = [...prev];
            const index = arr.findIndex((message) => message.id === data?.messageId);
            if (index !== -1) {
              const reactionID = arr[index]['Reactions'].findIndex((reaction) => reaction.id === data?.id);
              if (reactionID !== -1) {
                arr[index]['Reactions'].splice(reactionID, 1);
              }
            }
            return arr;
          });
        }
      };

      const handleDeleteChannelMessage = (data) => {
        if (data && data?.channelId === activeTab?.id) {
          setChannelMessages((prev) => {
            const arr = [...prev];
            const index = arr.findIndex((message) => message.id === data?.messageId);
            if (index !== -1) {
              arr[index]['deletedAt'] = new Date();
            }
            return arr;
          });
        }
      };

      const handleEditChannelMessage = (data) => {
        if (data && data?.channelId === activeTab?.id) {
          setChannelMessages((prev) => {
            const arr = [...prev];
            const index = arr.findIndex((message) => message.id === data?.id);
            if (index !== -1) {
              arr[index].content = data?.content;
              arr[index]['editedAt'] = data?.editedAt;
            }
            return arr;
          });
        }
      };

      const handleCreateDirectChannel = (data) => {
        setDirectChannels((prev) => [...prev, data]);
      };

      const handleCreateDirectMessageReaction = (data) => {
        playNotificationSound();

        if (data && data?.directChannelId === activeTab?.id) {
          setDirectMessages((prev) => {
            const arr = [...prev];
            const index = arr.findIndex((message) => message.id === data?.messageId);
            if (index !== -1) {
              arr[index].Reactions = [...arr[index].Reactions, data];
            }
            return arr;
          });
        }
      };

      const handleDeleteDirectMessageReaction = (data) => {
        if (data && data?.directChannelId === activeTab?.id) {
          setDirectMessages((prev) => {
            const arr = [...prev];
            const index = arr.findIndex((message) => message.id === data?.messageId);
            if (index !== -1) {
              const reactionID = arr[index]['Reactions'].findIndex((reaction) => reaction.id === data?.id);
              if (reactionID !== -1) {
                arr[index]['Reactions'].splice(reactionID, 1);
              }
            }
            return arr;
          });
        }
      };

      const handleEditDirectMessage = (data) => {
        if (data && data?.directChannelId === activeTab?.id) {
          setDirectMessages((prev) => {
            const arr = [...prev];
            const index = arr.findIndex((message) => message.id === data?.id);
            if (index !== -1) {
              arr[index].content = data?.content;
              arr[index]['editedAt'] = data?.editedAt;
            }
            return arr;
          });
        }
      };

      const handleDeleteDirectMessage = (data) => {
        if (data && data?.directChannelId === activeTab?.id) {
          setDirectMessages((prev) => {
            const arr = [...prev];
            const index = arr.findIndex((message) => message.id === data?.messageId);
            if (index !== -1) {
              arr[index]['deletedAt'] = new Date();
            }
            return arr;
          });
        }
      };

      // Add event listeners
      socketContext.socket.on('create-channel-response', handleCreateChannel);
      socketContext.socket.on('send-channel-message-response', handleChannelMessageSend);
      socketContext.socket.on('receive-channel-message', handleChannelMessageReceive);
      socketContext.socket.on('send-direct-message-response', handleDirectMessageSend);
      socketContext.socket.on('receive-direct-message', handleDirectMessageReceive);
      socketContext.socket.on('start-typing-response', handleStartTyping);
      socketContext.socket.on('stop-typing-response', handleStopTyping);
      socketContext.socket.on('create-channel-reaction-response', handleCreateChannelReaction);
      socketContext.socket.on('delete-channel-reaction-response', handleDeleteChannelReaction);
      socketContext.socket.on('delete-channel-message-response', handleDeleteChannelMessage);
      socketContext.socket.on('edit-channel-message-response', handleEditChannelMessage);
      socketContext.socket.on('create-direct-channel-response', handleCreateDirectChannel);
      socketContext.socket.on('create-direct-channel-reaction-response', handleCreateDirectMessageReaction);
      socketContext.socket.on('delete-direct-channel-reaction-response', handleDeleteDirectMessageReaction);
      socketContext.socket.on('edit-direct-message-response', handleEditDirectMessage);
      socketContext.socket.on('delete-direct-message-response', handleDeleteDirectMessage);

      // Cleanup function to remove event listeners
      return () => {
        socketContext.socket.off('create-channel-response', handleCreateChannel);
        socketContext.socket.off('send-channel-message-response', handleChannelMessageSend);
        socketContext.socket.off('receive-channel-message', handleChannelMessageReceive);
        socketContext.socket.off('send-direct-message-response', handleDirectMessageSend);
        socketContext.socket.off('receive-direct-message', handleDirectMessageReceive);
        socketContext.socket.off('start-typing-response', handleStartTyping);
        socketContext.socket.off('stop-typing-response', handleStopTyping);
        socketContext.socket.off('create-channel-reaction-response', handleCreateChannelReaction);
        socketContext.socket.off('delete-channel-reaction-response', handleDeleteChannelReaction);
        socketContext.socket.off('delete-channel-message-response', handleDeleteChannelMessage);
        socketContext.socket.off('edit-channel-message-response', handleEditChannelMessage);
        socketContext.socket.off('create-direct-channel-response', handleCreateDirectChannel);
        socketContext.socket.off('create-direct-channel-reaction-response', handleCreateDirectMessageReaction);
        socketContext.socket.off('delete-direct-channel-reaction-response', handleDeleteDirectMessageReaction);
        socketContext.socket.off('edit-direct-message-response', handleEditDirectMessage);
        socketContext.socket.off('delete-direct-message-response', handleDeleteDirectMessage);
      };
    }
  }, [socketContext?.socket, activeTab]);

  const contextValue = {
    userData,
    activeConversation,
    findUser,
    activeReceiver,
    handleActiveConversation,
    activeThread,
    handleActiveThread,
    handleSearchUser,
    handleActiveUser,
    handleAddMessage,
    loggedInUser,
    activeProfile,
    handleActiveProfile,
    messages,
    replies,
    handleReplies,
    selectedUser,
    handleSelectedUser,
    getWorkspace,
    channels,
    workspaceInfo,
    activeTabInfo,
    activeTab,
    setActiveTab,
    setActiveTabInfo,
    channelMessages,
    activeChannelThread,
    setActiveChannelThread,
    channelThreadMessages,
    createChannelMessage,
    createDirectMessage,
    typingUsers,
    startTyping,
    stopTyping,
    notifications,
    directChannels,
    directMessages,
    activeDirectThread,
    setActiveDirectThread,
    directThreadMessages,
    createChannelReaction,
    removeChannelReaction,
    messageContent,
    setMessageContent,
    handleEditMessage,
    messageIdToEdit,
    createDirectChannel,
    createDirectMessageReaction,
    removeDirectMessageReaction,
    deleteChannelMessage,
    editChannelMessage,
    editDirectMessage,
    deleteDirectMessage,
    createChannel,
  };

  return <ChatContext.Provider value={contextValue}>{children}</ChatContext.Provider>;
};
