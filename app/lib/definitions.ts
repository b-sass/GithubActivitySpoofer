export type treeFile = {
  path?: string | undefined;
  mode?: "100644" | "100755" | "040000" | "160000" | "120000" | undefined;
  type?: "tree" | "commit" | "blob" | undefined;
  sha?: string | null | undefined;
  content?: string | undefined;
}