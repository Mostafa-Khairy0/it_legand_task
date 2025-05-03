import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components";
import { useAppSelector } from "@/hooks";
import { selectCommentById, selectUserById } from "@/store";

export const CommentCard = ({ commentId }: { commentId: number }) => {
  const comment = useAppSelector(selectCommentById(commentId));
  const user = useAppSelector(selectUserById(comment?.userId));

  return (
    <Card className="rounded-none flex flex-row p-[10px] gap-[5px] sm:gap-[10px] shadow-none border-none bg-background">
      <CardHeader className="w-[50px] sm:w-[70px] p-0">
        <Avatar className="w-[50px] h-[50px] sm:w-[70px] sm:h-[70px]">
          <AvatarImage src={user?.photo} />
          <AvatarFallback>{user?.name}</AvatarFallback>
        </Avatar>
      </CardHeader>
      <CardContent className="flex flex-col gap-[5px] p-0">
        <CardTitle>{user?.name}</CardTitle>
        <CardDescription>{`${new Date(
          comment?.createdAt
        ).toDateString()}`}</CardDescription>
        <CardDescription className="text-[1.2em] font-semibold">
          {comment?.content}
        </CardDescription>
      </CardContent>
    </Card>
  );
};
