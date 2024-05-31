import { v } from "convex/values";
import { internalAction, internalMutation, internalQuery } from "./_generated/server";
import { internal } from "./_generated/api";

export const clean = internalMutation({
  args: {},
  handler: async ({ db }, {}) => {
    let i = 0;
    for (const row of await db.query("votations").collect()) {
      i++;
      const {
        date,
        titre_court_de,
        titre_court_fr,
        titre_court_en,
        titre_complet_de,
        titre_complet_fr,
        titre_complet_en,
        annahme,
        number,
        forme,
        // @ts-expect-error
        d1e1, 
        // @ts-expect-error
        d1e2,
        // @ts-expect-error
        d1e3,
        // @ts-expect-error
        d2e1,
        // @ts-expect-error
        d2e2,
        // @ts-expect-error
        d2e3,
        // @ts-expect-error
        d3e1,
        // @ts-expect-error
        d3e2,
        // @ts-expect-error
        d3e3,
      } = row;
      await db.replace(row._id, {
        date,
        titre_court_de,
        titre_court_fr,
        titre_court_en,
        titre_complet_de,
        titre_complet_fr,
        titre_complet_en,
        annahme,
        number,
        forme,
        categories: {
          d1e1,
          d1e2,
          d1e3,
          d2e1,
          d2e2,
          d2e3,
          d3e1,
          d3e2,
          d3e3,
        },
      });
    }
    return i;
  },
});

export const toEmbed = internalQuery({
  args: {
    number: v.optional(v.number()),
  },
  handler: async (ctx,{number}) => {
    return await ctx.db.query("votations").withIndex("by_embedding_raw", q => q.eq("embedding", undefined)).take(number ?? 20);
  },
});

export const saveEmbedding = internalMutation({
  args: {
    id: v.id("votations"),
    embedding: v.array(v.float64()),  
  },
  handler: async (ctx, { id, embedding }) => {
    await ctx.db.patch(id, { embedding });
  }
});

export const embed = internalAction({
  args: {
    number: v.optional(v.number()),
  },
  handler: async (ctx, {number}) => {
    const toEmbed = await ctx.runQuery(internal.dataImport.toEmbed, {number});
    
    for (const row of toEmbed) {
      await ctx.runMutation(internal.dataImport.saveEmbedding, {
        id: row._id,
        embedding: await fetchEmbedding(row.titre_complet_fr + "\n" + row.titre_complet_en),
      });
    }
  },
});

export async function fetchEmbedding(text: string) {
  const result = await fetch("https://api.openai.com/v1/embeddings", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + process.env.OPENAI_KEY,
    },
    body: JSON.stringify({
      model: "text-embedding-ada-002",
      input: [text],
    }),
  });
  const jsonresults = await result.json();
  return jsonresults.data[0].embedding;
}
