// First, we must import the schema creator
import createSchema from "part:@sanity/base/schema-creator";

// Then import schema types from any plugins that might expose them
import schemaTypes from "all:part:@sanity/base/schema-type";
import { categoryDocument } from "../documents/categoryDocument";
import { guideDocument } from "../documents/guide";
import { typeDocument } from "../documents/type";
import { getLocaleElement, LocaleElementType } from "../fields/localeElement";
import blockContent from "../fields/blockContent";

// Then we give our schema to the builder and provide the result to Sanity
export default createSchema({
  // We name our schema
  name: "default",
  // Then proceed to concatenate our document type
  // to the ones provided by any plugins that are installed
  types: schemaTypes.concat([
    categoryDocument,
    guideDocument,
    typeDocument,
    blockContent,
    getLocaleElement({ type: LocaleElementType.String }),
    getLocaleElement({ type: LocaleElementType.Text }),
    getLocaleElement({ type: LocaleElementType.BlockContent }),
  ]),
});
