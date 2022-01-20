/**
 * For control over the content type of the action,
 * you can use an object with typed keys as follows:
 * */
export interface ScriptFilterItemAction  {
  text?: string[];
  url?: string;
  file?: string;
  auto?: string;
}

export type HotKeys = 'fn' | 'ctrl' | 'opt' | 'cmd' | 'shift';

/**
 * By omitting the "type", Alfred will load the file path itself, for example a png.
 * By using "type": "fileicon", Alfred will get the icon for the specified path.
 * Finally, by using "type": "filetype", you can get the icon of a specific file,
 * for example "path": "public.png"
 * */
interface FilterItemIcon {
  path: string;
  type?: 'fileicon' | 'filetype';
}

export interface ScriptFilterItem {
  /**
   * This is a unique identifier for the item which allows help Alfred to learn about
   * this item for subsequent sorting and ordering of the user's actioned results.
   *
   * It is important that you use the same UID throughout subsequent executions of your
   * script to take advantage of Alfred's knowledge and sorting. If you would like Alfred
   * to always show the results in the order you return them from your script, exclude the UID field.
   * */
  uid?: string;

  /**
   * The title displayed in the result row. There are no options for this element
   * and it is essential that this element is populated.
   * */
  title: string;

  /**
   * The subtitle displayed in the result row. This element is optional.
   * */
  subtitle?: string;

  /**
   * The argument which is passed through the workflow to the connected output action.
   *
   * While the arg attribute is optional, it's highly recommended that you populate this
   * as it's the string which is passed to your connected output actions. If excluded,
   * you won't know which result item the user has selected.
   *
   * It is also possible to pass out an array of strings as the argument where relevant
   * */
  arg?: string | string[];

  /**
   * The icon displayed in the result row. Workflows are run from their workflow folder,
   * so you can reference icons stored in your workflow relatively.
   * */
  icon?: FilterItemIcon;

  /**
   * default = true
   * If this item is valid or not. If an item is valid then Alfred will action this item
   * when the user presses return. If the item is not valid, Alfred will do nothing.
   * This allows you to intelligently prevent Alfred from actioning a result based on
   * the current {query} passed into your script.
   *
   * If you exclude the valid attribute, Alfred assumes that your item is valid.
   * */
  valid?: boolean;

  /**
   * From Alfred 3.5, the match field enables you to define what Alfred matches against
   * when the workflow is set to "Alfred Filters Results". If match is present, it fully
   * replaces matching on the title property.
   *
   * Note that the match field is always treated as case insensitive, and intelligently
   * treated as diacritic insensitive. If the search query contains a diacritic, the match becomes diacritic sensitive.
   *
   * This option pairs well with the "Alfred Filters Results" Match Mode option.
   * */
  match?: string;

  /**
   * An optional but recommended string you can provide which is populated into Alfred's
   * search field if the user auto-complete's the selected result (⇥ by default).
   *
   * If the item is set as "valid": false, the auto-complete text is populated into
   * Alfred's search field when the user actions the result.
   * */
  autocomplete?: string;

  /**
   * default = 'default'
   * By specifying "type": "file", this makes Alfred treat your result as a file on your
   * system. This allows the user to perform actions on the file like they can with Alfred's standard file filters.
   *
   * When returning files, Alfred will check if the file exists before presenting that
   * result to the user. This has a very small performance implication but makes the results
   * as predictable as possible. If you would like Alfred to skip this check as you are
   * certain that the files you are returning exist, you can use "type": "file:skipcheck".
   * */
  type?: 'default' | 'file' | 'file:skipcheck';

  /**
   * The mod element gives you control over how the modifier keys react. You can now define the
   * valid attribute to mark if the result is valid based on the modifier selection and set a
   * different arg to be passed out if actioned with the modifier.
   * */
  mods?: Record<HotKeys, Omit<ScriptFilterItem, 'mods'>>;

  /**
   * This element defines the Universal Action items used when actioning the result,
   * and overrides arg being used for actioning. The action key can take a string or
   * array for simple types', and the content type will automatically be derived
   * by Alfred to file, url or text.
   * */
  action?: ScriptFilterItemAction | string[] | string;

  /**
   * The text element defines the text the user will get when copying the selected
   * result row with ⌘C or displaying large type with ⌘L.
   * */
  text?: {
    copy?: string;
    largetype?: string;
  };

  /**
   * A Quick Look URL which will be visible if the user uses the Quick Look feature
   * within Alfred (tapping shift, or ⌘Y). Note that quicklookurl will also accept
   * a file path, both absolute and relative to home using ~/.
   * */
  quicklookurl?: string;

  /**
   * From Alfred 3.4.1, individual item objects can also have variables which are passed
   * out of the Script Filter object if the associated Result Item is selected in Alfred's
   * results list. variables set within an item will override any JSON session variables of the same name.
   *
   * It is also possible to add a variables object for each mod in the item object, allowing
   * you to differentiate when a mod result is selected within your workflow. Note that when
   * setting a variables object on a mod, this replaces the item variables, and doesn't inherit
   * from them, allowing maximum flexibility.
   *
   * When a mod doesn't contain a variables object, it will assume the item variables.
   * To prevent this, add an empty variables object: "variables": {}.
   * */
  variables?: Record<string, string>;
}

/**
 * results into Alfred from a Script Filter
 * */
export interface ScriptFilter {
  /**
   * Variables can be passed out of the script filter within a variables object.
   * This is useful for two things. Firstly, these variables will be passed out of
   * the script filter's outputs when actioning a result. Secondly, any variables
   * passed out of a script will be passed back in as environment variables when
   * the script is run within the same session. This can be used for very simply
   * managing state between runs as the user types input or when the script is set
   * to re-run after an interval.
   * */
  variables?: Record<string, string>;

  /**
   * Scripts can be set to re-run automatically after an interval using the 'rerun' key
   * with a value of 0.1 to 5.0 seconds. The script will only be re-run if the script
   * filter is still active and the user hasn't changed the state of the filter by
   * typing and triggering a re-run.
   * */
  return?: number;

  /**
   * Each item describes a result row displayed in Alfred. The three obvious elements
   * are the ones you see in an Alfred result row - title, subtitle and icon.
   * */
  items: ScriptFilterItem[];
}