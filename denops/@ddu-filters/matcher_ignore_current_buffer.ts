import {
  BaseFilter,
  DduItem,
} from "https://deno.land/x/ddu_vim@v2.6.0/types.ts";
import { Denops, fn } from "https://deno.land/x/ddu_vim@v2.6.0/deps.ts";
import { ActionData } from "https://deno.land/x/ddu_kind_file@v0.3.2/file.ts";

type Params = Record<never, never>;

export class Filter extends BaseFilter<Params> {
  private currentBuf = -1;

  override async onInit(args: {
    denops: Denops;
  }): Promise<void> {
    this.currentBuf = await fn.bufnr(args.denops);
  }

  override async filter(args: {
    denops: Denops;
    filterParams: Params;
    items: DduItem[];
  }): Promise<DduItem[]> {
    const bufName = await fn.bufname(args.denops, this.currentBuf);
    const currentPath = await fn.fnamemodify(
      args.denops,
      bufName,
      ":p",
    ) as string;
    return Promise.resolve(args.items.filter(
      (item) => {
        const action = item.action as ActionData;
        return action.path != currentPath && action.bufNr != this.currentBuf;
      },
    ));
  }

  override params(): Params {
    return {};
  }
}
