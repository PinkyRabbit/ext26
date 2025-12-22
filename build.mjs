import esbuild from "esbuild";

const watch = process.argv.includes("--watch");

await esbuild.build({
    entryPoints: ["src/content.ts"],
    outdir: "dist",
    bundle: false,
    sourcemap: true,
    target: ["es2020"],
    format: "esm"
});

if (watch) {
    const ctx = await esbuild.context({
        entryPoints: ["src/content.ts"],
        outdir: "dist",
        bundle: false,
        sourcemap: true,
        target: ["es2020"],
        format: "esm"
    });
    await ctx.watch();
    console.log("watching...");
}
