#!/bin/bash

echo "=== Step 1: Copying files ==="
echo ""

# Копіюємо blocks
echo "Copying blocks..."
cp -r blocks/* new/scss/blocks/
echo "✓ Blocks copied"

# Копіюємо utils
echo "Copying utils..."
cp -r utils/* new/scss/utils/
echo "✓ Utils copied"

# Копіюємо images
echo "Copying images..."
cp -r images/* new/images/
echo "✓ Images copied"

# Копіюємо FixelText fonts
echo "Copying FixelText fonts..."
mkdir -p new/fonts
cp -r FixelText new/fonts/
echo "✓ FixelText fonts copied"

# Копіюємо style.scss
echo "Copying style.scss..."
cp style.scss new/scss/style.scss
echo "✓ style.scss copied"

echo ""
echo "=== Step 2: Updating image paths ==="
echo ""

# Функція для заміни шляхів у файлі
update_paths() {
    local file=$1
    if [[ -f "$file" ]]; then
        # Замінюємо всі варіанти шляхів до images
        sed -i 's|"\./images/|"/wp-content/themes/help/new/images/|g' "$file"
        sed -i "s|'\./images/|'/wp-content/themes/help/new/images/|g" "$file"
        sed -i 's|"\.\./images/|"/wp-content/themes/help/new/images/|g' "$file"
        sed -i "s|'\.\./images/|'/wp-content/themes/help/new/images/|g" "$file"
        sed -i 's|"\.\./\.\./images/|"/wp-content/themes/help/new/images/|g' "$file"
        sed -i "s|'\.\./\.\./images/|'/wp-content/themes/help/new/images/|g" "$file"
        sed -i 's|"images/|"/wp-content/themes/help/new/images/|g' "$file"
        sed -i "s|'images/|'/wp-content/themes/help/new/images/|g" "$file"
        
        # Замінюємо всі варіанти шляхів до шрифтів
        sed -i 's|"\./FixelText/|"/wp-content/themes/help/new/fonts/FixelText/|g' "$file"
        sed -i "s|'\./FixelText/|'/wp-content/themes/help/new/fonts/FixelText/|g" "$file"
        sed -i 's|"\.\./FixelText/|"/wp-content/themes/help/new/fonts/FixelText/|g' "$file"
        sed -i "s|'\.\./FixelText/|'/wp-content/themes/help/new/fonts/FixelText/|g" "$file"
        sed -i 's|"\.\./\.\./FixelText/|"/wp-content/themes/help/new/fonts/FixelText/|g' "$file"
        sed -i "s|'\.\./\.\./FixelText/|'/wp-content/themes/help/new/fonts/FixelText/|g" "$file"
        sed -i 's|"FixelText/|"/wp-content/themes/help/new/fonts/FixelText/|g' "$file"
        sed -i "s|'FixelText/|'/wp-content/themes/help/new/fonts/FixelText/|g" "$file"
        
        echo "✓ Updated: $file"
    fi
}

# Оновлюємо всі SCSS файли у blocks
echo "Updating paths in blocks..."
for file in new/scss/blocks/*.scss; do
    update_paths "$file"
done

# Оновлюємо всі SCSS файли у utils
echo ""
echo "Updating paths in utils..."
for file in new/scss/utils/*.scss; do
    update_paths "$file"
done

# Оновлюємо style.scss
echo ""
echo "Updating paths in style.scss..."
update_paths "new/scss/style.scss"

echo ""
echo "=== Step 3: Running build ==="
echo ""

echo "Building CSS from SCSS..."
npx sass new/scss/style.scss:new/css/style.css --style compressed

if [ $? -eq 0 ]; then
    echo "✓ Build completed successfully!"
else
    echo "✗ Build failed!"
    exit 1
fi

echo ""
echo "=== Done! ==="
echo "All files have been copied, image paths have been updated, and CSS has been built."
