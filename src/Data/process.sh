# command parameters
input=$1
target=$2

# config
sizes=(x70 x150 1280x1280^\> 1920x1920^\> 2560x2560^\> 3840x3840^\>)

echo "(re)create size-folders"
for size in ${sizes[*]}
do
    size=${size//>}
    size=${size//^}
    rm -rf "$target/$size"
    mkdir -p "$target/$size"
done

# iterate all files
for file in `find $input -maxdepth 1 -type f`
do
    echo "Resizing $file"
    name=${file##*/}
    name=${name%.*}
    #extension=${file##*.}

    for size in ${sizes[*]}
    do
        fn_size=${size//>}
        fn_size=${fn_size//^}
        convert $file -auto-orient -resize $size -quality 94 "$target/$fn_size/$name.jpg"
    done
done

echo "Create files list"
ls "$target/${sizes[0]}" > "$target/files.txt"
