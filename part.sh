#! /bin/bash


source_path=$1
dest_path=$2
total=`ls $source_path | wc -l`


for id in $(seq -w 1 100 $total)
do
    new_file=`echo $dest_path'endgames'$id'.pgn'`
    touch `echo $new_file`
    for j in {0..99}
    do
        _id=`expr $id + $j`
        __id=`printf '%05d' $_id`
        cat `echo $source_path'endgame'$__id'.pgn'` >> $new_file
        echo -e '' >> $new_file
    done
    echo $id
done

