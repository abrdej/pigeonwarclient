var board = {};

board.initialize = function (cols, rows) {
    board.cols = cols;
    board.rows = rows;
    board.fields = [];
    for (var j = 0; j < board.rows; j++) {
        for (var i = 0; i < board.cols; i++) {
            var field = game.add.sprite(i * field_size, j * field_size, 'Grass');
            field.sendToBack();
            field.inputEnabled = true;
            field.events.onInputDown.add(onBoard.bind(this, i, j));
            board.fields.push(field);
        }
    }
    board.refresh();
};

board.refresh = function () {
    board.fields.forEach(function (field) {
        field.loadTexture('Grass');
    });
};

board.update_state = function () {
    board.refresh();

    console.log("actual_target_type: " + actual_target_type);

    if (actual_target_type !== "non") {
        possible_movements.forEach(function (index) {

            if (actual_target_type === "moving") {
                board.fields[index].loadTexture('GrassMove', 0);

            } else if (actual_target_type === "enemy") {

                if (valid_movements.indexOf(index) !== -1) {
                    board.fields[index].loadTexture('GrassDamage');

                } else {
                    board.fields[index].loadTexture('GrassAttack');
                }

            } else if (actual_target_type === "friendly") {
                if (valid_movements.indexOf(index) !== -1) {
                    board.fields[index].loadTexture('GrassBoost');
                } else {
                    board.fields[index].loadTexture('GrassFriendly');
                }
            } else {
                board.fields[index].loadTexture('GrassMove');
            }
        });
    }

    if (selected_index !== no_selected_index) {
        board.fields[selected_index].loadTexture('GrassSelected');
    }
};