var merge = require('merge');

module.exports = function documarkChapterNumbering ($, document, done) {
	var defaults = {
		depth: 3
	};
	var config = merge(true, defaults, document.config().chapterNumbering);
	var depth  = Math.max(0, Math.min(6, config.depth)); // 0 - 6

	// Automatic page numbering
	var numbers = new Uint8Array(depth);

	function numberIndexByElement (el) {
		// h1 => 0, h2 => 1, etc.
		return parseInt(el.name.substr(1), 10) - 1;
	}

	function updateNumbering ($item) {
		var i = numberIndexByElement($item[0]);
		if (isNaN(i)) return;

		numbers[i] += 1;

		// Entered new chapter, reset sub chapter numbering
		for (var j = i + 1; j < numbers.length; ++j) {
			numbers[j] = 0;
		}
	}

	function createPrefix ($item) {
		var i = numberIndexByElement($item[0]);
		if (isNaN(i)) return;

		var prefix = '';

		for (var j = 0; j <= i; ++j) {
			prefix += numbers[j] + '.';
		}

		return prefix + ' ';
	}

	function createTitle ($item, title) {
		// Sanitize title
		title = title.trim().replace(/^[0-9\.\s]+/, '');

		// Prepend chapter number
		return createPrefix($item) + title;
	}

	function updateTitle ($item) {
		// Get first non-empty text node
		var $textNode = $item.contents().filter(function () {
			return this.type === 'text' && this.data.trim().length > 0;
		}).eq(0);

		// Update title
		if ($textNode.length) {
			$textNode[0].data = createTitle($item, $textNode.text());
		} else {
			$item.text(createTitle($item, $item.text()));
		}
	}

	// Iterate over header elements
	var selector = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].slice(0, depth).join(',');

	$(selector).each(function () {
		var $this = $(this);

		// Skip if self/parent has 'no-index' class
		if ($this.hasClass('no-index') || $this.parents('.no-index').length) {
			return;
		}

		updateNumbering($this);
		updateTitle($this);
	});

	done();
};
