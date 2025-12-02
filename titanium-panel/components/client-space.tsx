'use client';

import { useState } from 'react';
import { Badge } from '@/components/ui/shadcn/badge';
import { Button } from '@/components/ui/shadcn/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/shadcn/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/shadcn/dropdown-menu';
import { Input } from '@/components/ui/shadcn/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/shadcn/select';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/shadcn/tabs';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/shadcn/tooltip';
import { ScrollArea } from '@/components/ui/shadcn/scroll-area';
import { Separator } from '@/components/ui/shadcn/separator';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/ui/shadcn/avatar';
import { Progress } from '@/components/ui/shadcn/progress';
import {
  AlertCircle,
  CheckCircle2,
  ChevronDown,
  MessageCircle,
  Pin,
  Search,
  Star,
  UserCircle2,
  X,
} from 'lucide-react';

// Mock data for demonstration
const mockChats = [
  {
    id: 1,
    customer: 'Alice Johnson',
    status: 'active',
    unread: true,
    pinned: true,
    lastMessage: 'I need help with my order',
    satisfaction: 4,
  },
  {
    id: 2,
    customer: 'Bob Smith',
    status: 'resolved',
    unread: false,
    pinned: false,
    lastMessage: 'Thank you for your assistance',
    satisfaction: 5,
  },
  {
    id: 3,
    customer: 'Charlie Brown',
    status: 'active',
    unread: true,
    pinned: false,
    lastMessage: 'When will my item be shipped?',
    satisfaction: 3,
  },
  {
    id: 4,
    customer: 'Diana Prince',
    status: 'pending',
    unread: false,
    pinned: false,
    lastMessage: 'Is this item in stock?',
    satisfaction: null,
  },
];

const mockIssues = [
  {
    id: 1,
    title: 'Order Delay',
    status: 'in progress',
    assignee: 'John Doe',
    progress: 50,
  },
  {
    id: 2,
    title: 'Refund Request',
    status: 'pending',
    assignee: 'Jane Smith',
    progress: 20,
  },
  {
    id: 3,
    title: 'Product Inquiry',
    status: 'resolved',
    assignee: 'Mike Johnson',
    progress: 100,
  },
];

export function ClientSpaceComponent() {
  const [selectedChat, setSelectedChat] = useState(mockChats[0]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isMobileDetailView, setIsMobileDetailView] = useState(false);

  const filteredChats = mockChats.filter(
    (chat) =>
      chat.customer.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (statusFilter === 'all' || chat.status === statusFilter),
  );

  const getStatusBadge = (status) => {
    switch (status) {
      case 'active':
        return <Badge variant="default">Active</Badge>;
      case 'resolved':
        return <Badge variant="secondary">Resolved</Badge>;
      case 'pending':
        return <Badge variant="warning">Pending</Badge>;
      default:
        return null;
    }
  };

  const renderStars = (rating) => {
    return Array(5)
      .fill(0)
      .map((_, i) => (
        <Star
          key={i}
          className={`h-4 w-4 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
        />
      ));
  };

  return (
    <div className="container mx-auto p-4 sm:p-6">
      <h1 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6">
        Client Space
      </h1>
      <div className="flex flex-col lg:flex-row gap-4 sm:gap-6">
        <Card
          className={`flex-grow lg:max-w-md ${isMobileDetailView ? 'hidden lg:block' : ''}`}
        >
          <CardHeader>
            <CardTitle>Active Conversations</CardTitle>
            <CardDescription>Manage your customer chats</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-2 mb-4">
              <div className="relative w-full sm:w-auto">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search chats..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8 w-full"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full sm:w-[120px]">
                  <SelectValue placeholder="Filter" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="resolved">Resolved</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <ScrollArea className="h-[400px] lg:h-[calc(100vh-300px)]">
              {filteredChats.map((chat) => (
                <div
                  key={chat.id}
                  className={`flex items-center space-x-4 p-2 rounded-lg cursor-pointer ${
                    selectedChat.id === chat.id ? 'bg-muted' : ''
                  }`}
                  onClick={() => {
                    setSelectedChat(chat);
                    setIsMobileDetailView(true);
                  }}
                >
                  <Avatar>
                    <AvatarImage
                      src={`https://api.dicebear.com/6.x/initials/svg?seed=${chat.customer}`}
                    />
                    <AvatarFallback>{chat.customer[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {chat.customer}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {chat.lastMessage}
                    </p>
                  </div>
                  <div className="flex flex-col items-end space-y-1">
                    {getStatusBadge(chat.status)}
                    {chat.unread && <Badge variant="destructive">New</Badge>}
                    {chat.pinned && <Pin className="h-4 w-4 text-blue-500" />}
                  </div>
                </div>
              ))}
            </ScrollArea>
          </CardContent>
        </Card>
        <div
          className={`flex-grow space-y-4 sm:space-y-6 ${isMobileDetailView ? '' : 'hidden lg:block'}`}
        >
          <Card>
            <CardHeader className="flex flex-row items-center">
              <div className="flex-1">
                <CardTitle>{selectedChat.customer}</CardTitle>
                <CardDescription>Customer Profile and Chat</CardDescription>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden"
                onClick={() => setIsMobileDetailView(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="chat">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="chat">Chat</TabsTrigger>
                  <TabsTrigger value="profile">Profile</TabsTrigger>
                  <TabsTrigger value="issues">Issues</TabsTrigger>
                </TabsList>
                <TabsContent value="chat" className="space-y-4">
                  <div className="h-[300px] lg:h-[400px] border rounded-lg p-4 overflow-y-auto">
                    {/* Chat messages would go here */}
                    <p className="text-sm text-muted-foreground">
                      Chat history placeholder...
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Input placeholder="Type your message..." />
                    <Button>Send</Button>
                  </div>
                </TabsContent>
                <TabsContent value="profile">
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-lg font-medium">Customer Details</h3>
                      <p className="text-sm text-muted-foreground">
                        Email:{' '}
                        {selectedChat.customer.toLowerCase().replace(' ', '.')}
                        @example.com
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Phone: +1 (555) 123-4567
                      </p>
                    </div>
                    <div>
                      <h3 className="text-lg font-medium">
                        Satisfaction Rating
                      </h3>
                      <div className="flex items-center space-x-1">
                        {renderStars(selectedChat.satisfaction)}
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-medium">Order History</h3>
                      <p className="text-sm text-muted-foreground">
                        Total Orders: 5
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Last Order: 2 weeks ago
                      </p>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="issues">
                  <div className="space-y-4">
                    {mockIssues.map((issue) => (
                      <Card key={issue.id}>
                        <CardHeader>
                          <CardTitle>{issue.title}</CardTitle>
                          <CardDescription>
                            Assigned to: {issue.assignee}
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="flex items-center space-x-2">
                            <Progress
                              value={issue.progress}
                              className="flex-1"
                            />
                            <span className="text-sm font-medium">
                              {issue.progress}%
                            </span>
                          </div>
                        </CardContent>
                        <CardFooter>
                          <Button variant="outline" size="sm">
                            Update
                          </Button>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                <Button variant="outline" className="flex-1 sm:flex-none">
                  <MessageCircle className="mr-2 h-4 w-4" />
                  <span className="hidden sm:inline">
                    Send Template Response
                  </span>
                  <span className="sm:hidden">Template</span>
                </Button>
                <Button variant="outline" className="flex-1 sm:flex-none">
                  <UserCircle2 className="mr-2 h-4 w-4" />
                  <span className="hidden sm:inline">
                    Assign to Team Member
                  </span>
                  <span className="sm:hidden">Assign</span>
                </Button>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="outline" className="flex-1 sm:flex-none">
                        <AlertCircle className="mr-2 h-4 w-4" />
                        <span className="hidden sm:inline">Escalate Issue</span>
                        <span className="sm:hidden">Escalate</span>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Escalate this issue to a senior team member</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
