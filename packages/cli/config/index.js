import "dotenv/config";

import * as path from "path";
import { format, subDays } from "date-fns";

const NODE_ENV = process.env.NODE_ENV || "development";

const basePath = path.resolve();

export const CONFIG_PATH = path.join(basePath, "config");
export const CLI_APP_DIR = path.join(basePath, "cli", "src");

/**
 * LOGS DIRECTORY
 */
export const LOGS_DIR = path.join(
  process.env.LOGS_DIR || path.join(basePath, "app-data", "logs"),
  NODE_ENV
);

/**
 * Path to the data directory used by the CLI to store data
 * (e.g. downloaded files, local git repository, etc)
 *
 * The path can be set via environment variable CLI_DATA_DIR.
 * If not set, the default value depends on the environment:
 *  - In development: The default value is set to "app-data/development"
 *  - In production: The default value is set to "app-data/production"
 *  - Other environments: The default value is set to the value of NODE_ENV
 *
 */
const CLI_DATA_DIR = path.join(
  process.env.CLI_DATA_DIR || path.join(basePath, "app-data", "cli"),
  NODE_ENV
);

/**
 * The default date for the start of the git history, which can be set via
 * environment variable.
 */
export const GIT_HISTORY_START_DATE =
  process.env.GIT_HISTORY_START_DATE ||
  (NODE_ENV === "development"
    ? "2015-02-25Z"
    : format(subDays(new Date(), 10), "yyyy-MM-dd") + "Z");

export const GIT_HISTORY_END_DATE =
  process.env.GIT_HISTORY_END_DATE ||
  (NODE_ENV === "development"
    ? "2015-03-05Z"
    : format(new Date(), "yyyy-MM-dd") + "Z");

/**
 * GITEA SERVER
 */

export const GIT_USER = process.env.GIT_USER || "osmforcities";
export const GIT_EMAIL = process.env.GIT_EMAIL || "no-reply@osmforcities@org";
export const GITEA_ACCESS_TOKEN = process.env.GITEA_ACCESS_TOKEN;
export const GITEA_HOST_URL =
  process.env.GITEA_HOST_URL || `http://localhost:3000`;

/**
 * HISTORY PBF URL
 *
 * The sample was generate with the following commands:
 *
 * osmium time-filter -o ofc-sample.osh.pbf history.osh.pbf 2015-05-01T00:00:00Z 2015-05-05T00:00:00Z
 * osmium extract --bbox -77,-34,-28,9 -H ofc-sample.osh.pbf -o sao-paulo-2015-05-01-2015-05-05.osh.pbf
 */
export const FULL_HISTORY_FILE_URL =
  process.env.FULL_HISTORY_FILE_URL ||
  "https://planet.osm.org/pbf/full-history/history-latest.osm.pbf";

/**
 * TEMPORARY DIRECTORY
 *
 * Used to store temporary files during the execution of
 * the CLI. The path can be set via environment variable TMP_DIR. If not set,
 * the default value is /tmp/osm-for-cities.
 */
export const TMP_DIR = path.join(
  process.env.TMP_DIR || path.join("/", "tmp", "osm-for-cities"),
  NODE_ENV
);

/**
 * CONTEXTS DATA PATH
 * Path to the contexts data directory used by the CLI.
 */
export const CONTEXTS_DATA_PATH = path.join(CLI_DATA_DIR, "contexts");

/**
 * HISTORY PBF PATH
 * Path to the history pbf data directory used by the CLI, can be set via
 * environment variable HISTORY_PBF_PATH. If not set, the default value is
 * $CLI_DATA_DIR/history-pbf.
 */
export const HISTORY_PBF_PATH =
  process.env.HISTORY_PBF_PATH || path.join(CLI_DATA_DIR, "history-pbf");

export const HISTORY_PBF_FILE = path.join(HISTORY_PBF_PATH, "history.osh.pbf");
export const HISTORY_META_JSON = `${HISTORY_PBF_FILE}.json`;
