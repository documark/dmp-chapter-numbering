# Documark Chapter Numbering

[![npm version](https://badge.fury.io/js/dmp-chapter-numbering.svg)](http://badge.fury.io/js/dmp-chapter-numbering)
[![dependency status](https://david-dm.org/mauvm/dmp-chapter-numbering.svg)](https://david-dm.org/mauvm)

> Documark plugin for automatic chapter numbering.

## Usage

1. Add plugin to document configuration:

	```yaml
	plugins:
	  - dmp-chapter-numbering
	```

That's it! All `h1`, `h2`, and `h3` elements will now be automatically numbered.

Add a `no-number` class to the header element (or one of its parents) to skip numbering.

## Configuration

Optionally configure the numbering depth in your document configuration:

```yaml
chapterNumbering:
  depth: 2    # Default: 3, min: 0 (no numbering), and max: 6
```

Now, only `h1` and `h2` elements will be numbered.
