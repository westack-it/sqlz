# ADR 0043: Zig 0.17 toolchain and dependency pins

- Status: Accepted
- Date: 2026-11-08
- Refines: [ADR 0018](0018-ziggy-for-versioned-project-metadata.md),
  [ADR 0029](0029-supported-platform-and-conformance-matrix.md)

## Context

sqlz guarantees one exact Zig release. Zig 0.17.0 changes the build API, so no
0.16 dependency configures under it, and the Ziggy commit pinned for 0.16 cannot
be kept.

## Decision

Guarantee exactly Zig 0.17.0. Pin Ziggy v0.3.0, and the zqlite, pg.zig, and zio
commits that support 0.17. zio has no 0.17 release yet, so its test-only pin is a
`main` commit.

Ziggy v0.3.0 reads past the end of a source whose string stops inside a multi-byte
sequence. `config.parse` and `migrations.parseManifest` reject invalid UTF-8 before
calling the deserializer rather than relying on their callers to.

Configuration caching means a directory walk in `build.zig` no longer repeats on
every build, so `addProjectInputs` declares each directory it visits with
`std.Build.dependOnDirectoryContents`.

## Alternatives considered

Supporting 0.16 and 0.17 together and forking Ziggy at the old commit were
rejected: the build APIs do not overlap, and a fork would carry the port alone.

## Consequences

Ziggy v0.3.0 validates string escapes and numeric literals more strictly, so a
project file the old pin accepted can now be a diagnostic. Format versions do not
change. Every sqlz fixture parses unchanged.

## Normative references

- [Compatibility](../compatibility.md)
- [Catalogs](../catalogs.md)
- [Build integration](../build-integration.md)
