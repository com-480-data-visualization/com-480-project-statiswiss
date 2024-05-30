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
      const {date, titre_complet_fr} = row;
      result.push({date, titre_complet_fr});
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
      limit: 8,
    });

    return await runQuery(internal.search.search, {ids: rows.map(row => row._id)});
  },
});