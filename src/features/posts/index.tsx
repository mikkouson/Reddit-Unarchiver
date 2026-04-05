import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "#/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "#/components/ui/tooltip";
import moment from "moment";
import { useQueryState } from "nuqs";
import { FaReddit } from "react-icons/fa";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import useSWR from "swr";
import { InputFieldgroup } from "./components/form";
import { Skeleton } from "#/components/ui/skeleton";

const fetcher = (...args: Parameters<typeof fetch>) =>
  fetch(...args).then((res) => res.json());

const PostPage = () => {
  const [subreddit] = useQueryState("subreddit", { defaultValue: "" });
  const [author] = useQueryState("author", { defaultValue: "" });
  const [after] = useQueryState("after", { defaultValue: "" });
  const [before] = useQueryState("before", { defaultValue: "" });
  const [limit] = useQueryState("limit", { defaultValue: "100" });
  const [sort] = useQueryState("sort", { defaultValue: "desc" });
  const [titleQuery] = useQueryState("title", { defaultValue: "" });
  const [selftext] = useQueryState("selftext", { defaultValue: "" });
  const [urlMatch] = useQueryState("url", { defaultValue: "" });

  let url = `${import.meta.env.VITE_ARTIC_API}posts/search?`;
  const params = new URLSearchParams();
  if (subreddit) params.append("subreddit", subreddit);
  if (author) params.append("author", author);
  if (after) {
    const afterUnix = Math.floor(new Date(after).getTime() / 1000);
    if (!isNaN(afterUnix)) params.append("after", afterUnix.toString());
  }
  if (before) {
    const beforeUnix = Math.floor(new Date(before).getTime() / 1000);
    if (!isNaN(beforeUnix)) params.append("before", beforeUnix.toString());
  }
  if (limit) params.append("limit", limit);
  if (sort) params.append("sort", sort);
  if (titleQuery) params.append("title", titleQuery);
  if (selftext) params.append("selftext", selftext);
  if (urlMatch) params.append("url", urlMatch);

  const { data, error, isLoading } = useSWR(url + params.toString(), fetcher);

  if (error) return <>Error fetching data</>;

  if (isLoading) {
    return (
      <main className="page-wrap px-4 py-12">
        <InputFieldgroup />
        {[...Array(5)].map((_, i) => (
          <Card key={i} className="mt-2">
            <CardHeader className="space-y-2">
              <Skeleton className="h-4 w-1/4" />
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-20 w-full" />
            </CardHeader>
            <CardFooter>
              <Skeleton className="h-8 w-8 rounded-full" />
            </CardFooter>
          </Card>
        ))}
      </main>
    );
  }

  return (
    <main className="page-wrap px-4 py-12">
      <InputFieldgroup />
      {data.data.map((post: any, index: number) => (
        <Card key={index} className="mt-2">
          <CardHeader className="space-y-2">
            <div>
              <a
                href={`https://www.reddit.com/r/${post.subreddit}`}
                target="_blank"
                rel="noreferrer"
              >
                {post.subreddit_name_prefixed}
              </a>{" "}
              by{" "}
              <a
                href={`https://www.reddit.com/user/${post.author}`}
                target="_blank"
                rel="noreferrer"
              >
                {post.author}
              </a>{" "}
              at {moment.unix(post.created).format("LL")}
            </div>
            <CardTitle className="text-xl">{post.title}</CardTitle>
            <CardDescription className="prose prose-sm dark:prose-invert max-w-none">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {post.selftext}
              </ReactMarkdown>
            </CardDescription>
          </CardHeader>

          {post.media_metadata && (
            <CardContent className="flex flex-wrap gap-2">
              {Object.values(post.media_metadata).map(
                (image: any) =>
                  image?.s?.u && (
                    <img
                      key={image.id}
                      src={image.s.u}
                      alt=""
                      className="w-24 h-24 object-cover rounded-md"
                    />
                  ),
              )}
            </CardContent>
          )}

          <CardFooter>
            <Tooltip>
              <TooltipTrigger>
                <a href={`${post.url}`} target="_blank" rel="noreferrer">
                  <FaReddit size={24} />
                </a>
              </TooltipTrigger>
              <TooltipContent side="bottom">
                <p>View on Reddit</p>
              </TooltipContent>
            </Tooltip>
          </CardFooter>
        </Card>
      ))}
    </main>
  );
};

export default PostPage;
