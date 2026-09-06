import { UserModel } from "../database/Models";
import { DEFAULT_VISIBLE_TOP_SONGS_COLUMNS } from "../database/schemas/user";
import { startMigration } from "../tools/migrations";

export const up = async () => {
  startMigration("visible top songs columns in user");
  await UserModel.updateMany(
    {},
    {
      $set: {
        "settings.visibleTopSongsColumns": DEFAULT_VISIBLE_TOP_SONGS_COLUMNS,
      },
    },
  );
};

export const down = async () => {
  await UserModel.updateMany(
    {},
    { $unset: { "settings.visibleTopSongsColumns": "" } },
  );
};
