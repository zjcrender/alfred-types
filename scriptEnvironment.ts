type BasicEnv = {
  /**
   * This is the location of the Alfred.alfredpreferences.
   * If a user has synced their settings,
   * this will allow you to find out where their settings are regardless of sync state.
   * */
  alfred_preferences: string;

  /**
   * From Alfred 2.4, non-synced preferences are moving out of the standard macOS
   * preferences due to a Yosemite issue with prefs inheritance between Alfred
   * Preferences.app and Alfred 2.app.
   *
   * Any local (Mac-specific) preferences are now stored within Alfred.alfredpreferences
   * under …/preferences/local/[alfred_preferences_localhash]/ instead
   * and use Alfreds own preferences framework.
   * */
  alfred_preferences_localhash: string;

  /**
   * Current theme used
   * */
  alfred_theme: string

  /**
   * If youre creating icons on the fly,
   * this allows you to find out the colour of the theme background.
   * */
  alfred_theme_background: string;

  /**
   * The colour of the selected result.
   * */
  alfred_theme_selection_background: string;

  /**
   * Find out what subtext mode the user has selected in the Appearance preferences.
   *
   * Usability note:
   * This is available so developers can tweak the result text based on the users selected mode,
   * but a workflows result text should not be bloated unnecessarily based on this,
   * as the main reason users generally hide the subtext is to make Alfred look cleaner.
   * */
  alfred_theme_subtext: string;

  /**
   * Find out which version and build the user is currently running.
   * This may be useful if your workflow depends on a particular Alfred versions features.
   * */
  alfred_version: string;
  alfred_version_build: string;

  /**
   * Name of the currently running workflow
   * */
  alfred_workflow_name: string;

  /**
   * Unique ID of the currently running workflow
   * */
  alfred_workflow_uid: string;

  /**
   * Current workflow version
   * */
  alfred_workflow_version?: string;

  /**
   * If the user currently has the debug panel open for this workflow.
   * This variable is only set if the user is debugging, and is set to value 1.
   * */
  alfred_debug?: '1';
}

type EnvWithBundleid = BasicEnv & {
  /**
   * The bundle ID of the current running workflow
   * */
  alfred_workflow_bundleid?: string;

  /**
   * These are the recommended locations for volatile and non-volatile workflow data:
   *
   * Cache: ~/Library/Caches/com.runningwithcrayons.Alfred/Workflow Data/[bundle id]
   * Data: ~/Library/Application Support/Alfred/Workflow Data/[bundle id]
   *
   * Note that these two will only be populated if your workflow has a bundle id set.
   * */
  alfred_workflow_cache?: string;
  alfred_workflow_data?: string;
}

/**
 * useful alfred_variables in the script environment data,
 * to help you get commonly required Alfred information from the user's settings.
 * */
export type ScriptEnvironmentVariables = BasicEnv | EnvWithBundleid;
  