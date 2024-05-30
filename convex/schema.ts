import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  votations: defineTable({
    date: v.string(),
    number: v.string(),
    forme: v.number(),
    titre_court_de: v.string(),
    titre_court_fr: v.string(),
    titre_court_en: v.string(),
    titre_complet_de: v.string(),
    titre_complet_fr: v.string(),
    titre_complet_en: v.string(),
    categories: v.any(),
    embedding: v.optional(v.array(v.float64())),
  })
  .index("by_number", ["number"])
  .index("by_embedding_raw", ["embedding"])
  .vectorIndex("by_embedding", {
    vectorField: "embedding",
    dimensions: 1536,
  }),
});