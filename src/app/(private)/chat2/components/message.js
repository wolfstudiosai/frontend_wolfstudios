import { Avatar, Button, ButtonGroup, Chip, ClickAwayListener, IconButton, Link, Paper, Popper, Stack, Typography } from "@mui/material";
import { useContext, useRef, useState } from "react";
import { Iconify } from "/src/components/iconify/iconify";
import { ChatContext } from "/src/contexts/chat";

const reactionOptions = ['👍', '❤️', '😂', '🎉', '😮'];

export const Message = ({ isReplied = true }) => {
    const { handleReplies } = useContext(ChatContext);

    const [selectedReaction, setSelectedReaction] = useState('❤️');
    const [anchorEl, setAnchorEl] = useState(null);
    const popperRef = useRef(null);

    const toggleReactionBar = (event) => {
        setAnchorEl(anchorEl ? null : event.currentTarget);
    };

    const handleReactionSelect = (emoji) => {
        setSelectedReaction(emoji);
        setAnchorEl(null);
    };

    const handleClickAway = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);

    return (
        <Stack
            direction="row"
            gap={1}
            sx={{
                position: 'relative',
                p: 2,
                '&:hover .hover-action': { opacity: 1 }
            }}
        >
            <Avatar alt="Diana T." src="/diana.jpg" />
            <Stack direction="column" gap={0.5}>
                <Stack direction="row" alignItems="center" gap={1}>
                    <Typography fontWeight={600}>Diana T.</Typography>
                    <Typography variant="caption" color="text.secondary">2d ago</Typography>
                </Stack>

                {/* Message */}
                <Typography variant="body2">
                    I have already prepared all styles and components according to our standards during the design phase,
                    so the UI kit is 90% complete. All that remains is to add some states to the interactive elements and
                    prepare the Lottie files for animations.{" "}
                    <Link href="#" color="primary">@Emily D.</Link>, please take a look and let me know if you have any questions.
                </Typography>

                {/* Reactions */}
                <Stack direction="row" alignItems="center" spacing={0.5}>
                    {selectedReaction && (
                        <Chip label={`${selectedReaction} 1`} color="inherit" size="small" />
                    )}
                    <IconButton
                        size="small"
                        aria-label="react"
                        onClick={toggleReactionBar}
                        ref={popperRef}
                    >
                        <Iconify icon="material-symbols:add-reaction-outline" />
                    </IconButton>
                    {isReplied && (
                        <Button variant="text" onClick={() => handleReplies('msg_id')} color="primary">
                            Show 10 more replies
                        </Button>
                    )}
                </Stack>
            </Stack>

            {/* Hover actions */}
            <ButtonGroup
                className="hover-action"
                sx={{
                    backgroundColor: 'var(--mui-palette-background-level2)',
                    position: 'absolute',
                    top: 0,
                    right: 10,
                    opacity: 0,
                    transition: 'opacity 0.2s ease-in-out'
                }}
            >
                <IconButton title="Like">
                    <Iconify icon="solar:like-broken" />
                </IconButton>
                <IconButton title="React" onClick={toggleReactionBar}>
                    <Iconify icon="material-symbols:add-reaction-outline" />
                </IconButton>
                <IconButton title="Edit">
                    <Iconify icon="material-symbols:edit-outline-rounded" />
                </IconButton>
                <IconButton title="Copy">
                    <Iconify icon="mingcute:copy-line" />
                </IconButton>
                <IconButton title="Reply in thread">
                    <Iconify icon="mingcute:message-3-fill" />
                </IconButton>
                <IconButton title="Forward">
                    <Iconify icon="flowbite:forward-outline" />
                </IconButton>
                <IconButton title="Bookmark">
                    <Iconify icon="material-symbols-light:bookmark-outline" />
                </IconButton>
            </ButtonGroup>

            {/* Reaction Popper */}
            <Popper open={open} anchorEl={anchorEl} placement="top-start">
                <ClickAwayListener onClickAway={handleClickAway}>
                    <Paper sx={{ p: 1, display: 'flex', gap: 1, borderRadius: 2 }}>
                        {reactionOptions.map((emoji) => (
                            <Button
                                key={emoji}
                                onClick={() => handleReactionSelect(emoji)}
                                size="small"
                                sx={{ minWidth: '30px', fontSize: '1.2rem' }}
                            >
                                {emoji}
                            </Button>
                        ))}
                    </Paper>
                </ClickAwayListener>
            </Popper>
        </Stack>
    );
};




{/* Figma Link Card */ }
{/* <Card variant="outlined" sx={{ mt: 2, display: "flex", justifyContent: "space-between", alignItems: "center", p: 1.5 }}>
                        <Stack direction="row" spacing={1} alignItems="center">
                            <Box component="img" src="/figma-icon.svg" alt="figma" width={32} />
                            <Box>
                                <Typography fontWeight={500}>Conceptzilla website v.3.0</Typography>
                                <Typography variant="caption" color="text.secondary">www.figma.com</Typography>
                            </Box>
                        </Stack>
                        <Button size="small" variant="outlined" sx={{ textTransform: "none" }}>
                            Quick view
                        </Button>
                    </Card> */}