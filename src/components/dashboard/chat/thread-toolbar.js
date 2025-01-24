import * as React from "react";
import Avatar from "@mui/material/Avatar";
import AvatarGroup from "@mui/material/AvatarGroup";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import {List as ListIcon} from "@phosphor-icons/react/dist/ssr/List";
import  Badge from "@mui/material/Badge";
import useAuth from "@/hooks/useAuth";
export function ThreadToolbar({ thread }) {
  const  {userInfo}  = useAuth();


  const recipients = (thread.participants ?? []).filter((participant) => participant.id !== userInfo?.email);
console.log("Thread in toolbar",thread);
  return (
    <Stack
      direction="row"
      spacing={2}
      sx={{
        alignItems: "center",
        borderBottom: "1px solid var(--mui-palette-divider)",
        flex: "0 0 auto",
        justifyContent: "space-between",
        minHeight: "64px",
        px: 2,
        py: 1,
      }}
    >
      <Stack direction="row" spacing={2} sx={{ alignItems: "center", minWidth: 0 }}>
        <AvatarGroup
          max={2}
          sx={{
            "& .MuiAvatar-root": {
              fontSize: "var(--fontSize-xs)",
              height: "36px",
              width: "36px",
            },
          }}
        >
          {/* {recipients.map((recipient) => (
            <Avatar key={recipient.id} src={recipient.avatar} />
          ))} */}
          {
            recipients.map((recipient) => (
              <Badge
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          color="success"
          sx={{
            '& .MuiBadge-dot': {
              border: '2px solid var(--MainNav-background)',
              borderRadius: '50%',
              bottom: '6px',
              height: '12px',
              right: '6px',
              width: '12px',
            },
          }}
          variant="dot"
          key={recipient.id}
        >
          <Avatar src={recipient?.avatar} />
        </Badge>
            ))
          }
            
        </AvatarGroup>
        <Box sx={{ minWidth: 0 }}>
          {thread.type.toLowerCase() === "group" ? (
            <Typography noWrap variant="subtitle2">
              {thread.name}
            </Typography>
          ) : (
            <Typography noWrap variant="subtitle2">
              {recipients.map((recipient) => recipient.name).join(", ")}
            </Typography>
          )}

          {thread.type.toLowerCase() === "direct" ? (
            <Typography color="text.secondary" variant="caption">
              Active now
            </Typography>
          ) : (
            <Typography color="text.secondary" variant="caption">
              {thread.member_count} members
            </Typography>
          )}
        </Box>
      </Stack>

      <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
        <IconButton onClick={() => {}}>
          <ListIcon />
        </IconButton>
      </Stack>
    </Stack>
  );
}
