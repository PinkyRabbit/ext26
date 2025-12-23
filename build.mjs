import esbuild from "esbuild";

const watch = process.argv.includes("--watch");

const common = {
    entryPoints: ["src/content.ts", "src/background.ts"],
    outdir: "dist",
    bundle: true,
    sourcemap: true,
    target: ["es2020"],
    platform: "browser",
    format: "iife" // ✅ для MV2
};

if (watch) {
    const ctx = await esbuild.context(common);
    await ctx.watch();
    console.log("watching...");
} else {
    await esbuild.build(common);
}
