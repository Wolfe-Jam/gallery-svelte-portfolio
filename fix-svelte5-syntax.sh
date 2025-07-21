#!/bin/bash

# Fix Svelte 5 syntax issues in all components

echo "🔧 Fixing Svelte 5 syntax issues..."

# Find all Svelte files and fix $: reactive statements
find src/lib/components -name "*.svelte" -type f | while read -r file; do
    echo "Processing: $file"
    
    # Create a temporary file
    temp_file="${file}.tmp"
    
    # Process the file line by line
    awk '
    BEGIN { in_script = 0 }
    /<script/ { in_script = 1 }
    /<\/script>/ { in_script = 0 }
    {
        if (in_script && /^\s*\$:/) {
            # Replace $: with const and $derived
            gsub(/^\s*\$:/, "  const")
            gsub(/=/, "= $derived(")
            print $0 ");"
        } else {
            print $0
        }
    }
    ' "$file" > "$temp_file"
    
    # Replace original file
    mv "$temp_file" "$file"
done

echo "✅ Syntax fixes complete!"