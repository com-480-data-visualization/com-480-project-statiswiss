import { v } from "convex/values";
import { action, internalQuery } from "./_generated/server";
import { fetchEmbedding } from "./dataImport";
import { internal } from "./_generated/api";

export const search = internalQuery({
  args: {
    ids: v.array(v.id("votations"))
  },
  handler: async (ctx, {ids}) => {
    let result = [];
    for (const id of ids) {
      const row = await ctx.db.get(id);
      if (!row) continue;
      result.push({
        ...row,
        embedding: undefined,
        _id: undefined,
        _creationTime: undefined,
        categories: undefined,
        id: row.number,
        ...row.categories,
      });
    }
    return result;
  },
});

export default action({
  args: {
    query: v.string(),
  },
  handler: async ({ vectorSearch, runQuery }, {query}) => {
    const vector = await fetchEmbedding(query);
    const rows = await vectorSearch("votations", "by_embedding", {
      vector,
      limit: 20,
    });

    return await runQuery(internal.search.search, {ids: rows.map(row => row._id)});
  },
});