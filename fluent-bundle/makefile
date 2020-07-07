PACKAGE := @fluent/bundle
GLOBAL  := FluentBundle

include ../common.mk

build: index.js compat.js

index.js: $(SOURCES)
	@rollup $(CURDIR)/src/index.js \
	    --config $(ROOT)/bundle_config.js \
	    --banner "/* $(PACKAGE)@$(VERSION) */" \
	    --amd.id $(PACKAGE) \
	    --name $(GLOBAL) \
	    --output.file $@
	@echo -e " $(OK) $@ built"

compat.js: $(SOURCES)
	$(CURDIR)/../node_modules/eslint/bin/eslint.js --no-eslintrc --config eslint_compat_ie11.js --max-warnings 0 src
	$(CURDIR)/../node_modules/eslint/bin/eslint.js --no-eslintrc --config eslint_compat_modern.js --max-warnings 0 src

	$(CURDIR)/../node_modules/rollup/dist/bin/rollup \
	    --config compat_config.js \
	    --banner "/* $(PACKAGE)@$(VERSION) */" \
		--amd.id $(PACKAGE) \
	    --name $(GLOBAL)
	@rm polyfill-ie11-cjs.js # temp file created by our rollup build
	@echo -e " $(OK) $@ built"

clean:
	@rm -f index.js compat.js polyfill-ie11.js
	@rm -rf .nyc_output coverage
	@echo -e " $(OK) clean"

BEHAVIOR_FTL := $(wildcard ../fluent-syntax/test/fixtures_behavior/*.ftl)
REFERENCE_FTL := $(wildcard ../fluent-syntax/test/fixtures_reference/*.ftl)
STRUCTURE_FTL := $(wildcard ../fluent-syntax/test/fixtures_structure/*.ftl)
BEHAVIOR_JSON := $(BEHAVIOR_FTL:../fluent-syntax/test/fixtures_behavior/%.ftl=test/fixtures_behavior/%.json)
REFERENCE_JSON := $(REFERENCE_FTL:../fluent-syntax/test/fixtures_reference/%.ftl=test/fixtures_reference/%.json)
STRUCTURE_JSON := $(STRUCTURE_FTL:../fluent-syntax/test/fixtures_structure/%.ftl=test/fixtures_structure/%.json)

fixtures: $(BEHAVIOR_JSON) $(REFERENCE_JSON) $(STRUCTURE_JSON)

.PHONY: $(BEHAVIOR_JSON)
$(BEHAVIOR_JSON): test/fixtures_behavior/%.json: ../fluent-syntax/test/fixtures_behavior/%.ftl
	@node test/fixtures_behavior/make_fixtures.js -- $< > $@
	@echo -e " $(OK) $@"

.PHONY: $(REFERENCE_JSON)
$(REFERENCE_JSON): test/fixtures_reference/%.json: ../fluent-syntax/test/fixtures_reference/%.ftl
	@../tools/parse.js --runtime --silent $< > $@
	@echo -e " $(OK) $@"

.PHONY: $(STRUCTURE_JSON)
$(STRUCTURE_JSON): test/fixtures_structure/%.json: ../fluent-syntax/test/fixtures_structure/%.ftl
	@../tools/parse.js --runtime --silent $< > $@
	@echo -e " $(OK) $@"
