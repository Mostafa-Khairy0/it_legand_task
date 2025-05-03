"use client";
import { sendComment, unsendComment } from "@/app/actions";
import { Button, Textarea } from "../ui";
import {
  FormEvent,
  forwardRef,
  Ref,
  useActionState,
  useCallback,
  useEffect,
  useTransition,
} from "react";
import { useAppDispatch, useToast } from "@/hooks";
import { addOneComment, removeComment } from "@/store";

const initialState = {
  success: false,
  message: "",
  errors: undefined,
  comment: null,
} satisfies Parameters<typeof sendComment>[0];

export const SendCommentForm = forwardRef(
  ({ lessonId }: { lessonId: number }, ref: Ref<HTMLFormElement>) => {
    const [state, formAction] = useActionState(sendComment, initialState);
    const { loading, success, error } = useToast();
    const [isPending, startTransition] = useTransition();
    const dispatch = useAppDispatch();

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      loading("📨 Sending your comment...");
      const formData = new FormData(event.currentTarget);
      startTransition(() => {
        formAction(formData);
      });
    };

    const onUndo = useCallback((commentId: number) => {
      const formData = new FormData();
      formData.append("commentId", `${commentId}`);
      unsendComment(formData);
      dispatch(removeComment({ commentId, lessonId }));
    }, []);

    useEffect(() => {
      if (!isPending) {
        if (state.success && state.comment) {
          dispatch(addOneComment({ comment: state.comment, lessonId }));
          success(state.message, {
            action: {
              label: "Undo",
              onClick: () => {
                if (typeof state?.comment?.id == "number")
                  onUndo(state?.comment?.id);
              },
            },
          });
        } else if (state.errors) error(state.message);
      }
    }, [isPending, state, dispatch, lessonId]);

    return (
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-[20px] my-[50px]"
        ref={ref}
      >
        <input type="hidden" name="lessonId" value={lessonId} />
        <input type="hidden" name="userId" value={1} />
        <Textarea
          placeholder="💬 Leave a comment"
          className="h-[120px]"
          name="comment"
        />
        <Button className="w-[200px] h-[50px] p-[20px] text-[18px]">
          📝 Leave Feedback
        </Button>
      </form>
    );
  }
);
SendCommentForm.displayName = "SendCommentForm";
