import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { parseAsString, useQueryStates } from "nuqs";
import { useState } from "react";

const queryParams = {
  subreddit: parseAsString.withDefault(""),
  author: parseAsString.withDefault(""),
  after: parseAsString.withDefault(""),
  before: parseAsString.withDefault(""),
  limit: parseAsString.withDefault("10"),
  sort: parseAsString.withDefault("desc"),
  title: parseAsString.withDefault(""),
  selftext: parseAsString.withDefault(""),
  url: parseAsString.withDefault(""),
};

export function InputFieldgroup() {
  const [query, setQuery] = useQueryStates(queryParams);
  const [formData, setFormData] = useState(query);

  const handleChange = (key: keyof typeof formData, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleReset = () => {
    const resetData = {
      subreddit: "",
      author: "",
      after: "",
      before: "",
      limit: "100",
      sort: "desc",
      title: "",
      selftext: "",
      url: "",
    };
    setFormData(resetData);
    setQuery({
      subreddit: null,
      author: null,
      after: null,
      before: null,
      limit: null,
      sort: null,
      title: null,
      selftext: null,
      url: null,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setQuery({
      subreddit: formData.subreddit || null,
      author: formData.author || null,
      after: formData.after || null,
      before: formData.before || null,
      limit: formData.limit || null,
      sort: formData.sort || null,
      title: formData.title || null,
      selftext: formData.selftext || null,
      url: formData.url || null,
    });
  };

  return (
    <div className="w-full  rounded-xl border bg-card text-card-foreground shadow-sm">
      <div className="flex flex-col space-y-1.5 p-6 border-b border-border/50">
        <h3 className="text-xl font-semibold leading-none tracking-tight">
          Search Parameters
        </h3>
        <p className="text-sm text-muted-foreground">
          Adjust filters to refine your results.
        </p>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="p-6">
          <FieldGroup className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6 w-full">
            <Field>
              <FieldLabel htmlFor="fieldgroup-subreddit">Subreddit</FieldLabel>
              <Input
                id="fieldgroup-subreddit"
                placeholder="e.g. reactjs"
                value={formData.subreddit}
                onChange={(e) => handleChange("subreddit", e.target.value)}
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="fieldgroup-author">Author</FieldLabel>
              <Input
                id="fieldgroup-author"
                placeholder="e.g. spez"
                value={formData.author}
                onChange={(e) => handleChange("author", e.target.value)}
              />
            </Field>

            <Field>
              <FieldLabel htmlFor="fieldgroup-after">After (UTC)</FieldLabel>
              <Input
                id="fieldgroup-after"
                type="datetime-local"
                value={formData.after}
                onChange={(e) => handleChange("after", e.target.value)}
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="fieldgroup-before">Before (UTC)</FieldLabel>
              <Input
                id="fieldgroup-before"
                type="datetime-local"
                value={formData.before}
                onChange={(e) => handleChange("before", e.target.value)}
              />
            </Field>

            <Field>
              <FieldLabel htmlFor="fieldgroup-limit">Limit</FieldLabel>
              <Input
                id="fieldgroup-limit"
                type="number"
                min="1"
                placeholder="100"
                value={formData.limit}
                onChange={(e) => handleChange("limit", e.target.value)}
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="fieldgroup-sort">Date Sort</FieldLabel>
              <div className="flex w-full" id="fieldgroup-sort">
                <Button
                  type="button"
                  variant={formData.sort === "asc" ? "default" : "outline"}
                  className="flex-1 rounded-e-none focus:z-10"
                  onClick={() => handleChange("sort", "asc")}
                >
                  Ascending
                </Button>
                <Button
                  type="button"
                  variant={formData.sort === "desc" ? "default" : "outline"}
                  className="flex-1 rounded-s-none border-l-0 focus:z-10"
                  onClick={() => handleChange("sort", "desc")}
                >
                  Descending
                </Button>
              </div>
            </Field>

            <Field>
              <FieldLabel htmlFor="fieldgroup-title">Title</FieldLabel>
              <Input
                id="fieldgroup-title"
                placeholder="Requires Author or Subreddit"
                value={formData.title}
                onChange={(e) => handleChange("title", e.target.value)}
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="fieldgroup-selftext">Selftext</FieldLabel>
              <Input
                id="fieldgroup-selftext"
                placeholder="Requires Author or Subreddit"
                value={formData.selftext}
                onChange={(e) => handleChange("selftext", e.target.value)}
              />
            </Field>

            <Field className="md:col-span-2">
              <FieldLabel htmlFor="fieldgroup-url">
                URL (Prefix match)
              </FieldLabel>
              <Input
                id="fieldgroup-url"
                type="url"
                placeholder="https://"
                value={formData.url}
                onChange={(e) => handleChange("url", e.target.value)}
              />
            </Field>
          </FieldGroup>
        </div>
        <div className="flex items-center justify-between p-6 pt-0">
          <Button type="button" variant="ghost" onClick={handleReset}>
            Reset
          </Button>
          <Button type="submit" className="w-32">
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
}
