type EmptyFriendsListProps = { isCollapsed: boolean };

type FriendItemProps = {
  friend: Friend;
  isSelected: boolean;
  isCollapsed: boolean;
  onSelect: (friend: Friend) => void;
};

type FriendListProps = {
  friends: Friend[];
  selectedFriend: Friend;
  isCollapsed: boolean;
  onSelectFriend: (friend: Friend) => void;
};

type SidebarProps = {
  friends: Friend[];
  selectedFriend: Friend;
  onSelectFriend: (friend: Friend) => void;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
};

type SidebarFooterProps = {
  isCollapsed: boolean;
  onFriendsClick?: () => void;
};

type SidebarHeaderProps = {
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  searchTerm?: string;
  onSearchChange?: (value: string) => void;
};

type SidebarSearchProps = {
  searchTerm?: string;
  onSearchChange?: (value: string) => void;
};

export type {
  EmptyFriendsListProps,
  FriendItemProps,
  FriendListProps,
  SidebarProps,
  SidebarFooterProps,
  SidebarHeaderProps,
  SidebarSearchProps,
};
