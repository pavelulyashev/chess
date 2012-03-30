#! /bin/bash


path=$1
total=`ls $path | wc -l`


for id in {00001..23571..100}
do
    next=`expr $id + 100`
    new_dir=`echo $path$id - $next`
    mkdir $new_dir
    for j in {0..99}
    do
        _id=$id+$j
        fname=`echo endgame$_id.pgn`
        mv $path$fname $new_dir
    done
done

