var animation = {};

move_handler = function (animation_data) {
    var entity_id = animation_data[1];
    var to_index = animation_data[2];

    var entity_sprite = entities[entity_id];

    var to_pos = index_to_pos(to_index);

    var distance = Math.sqrt(Math.pow(entity_sprite.pos[0] - to_pos[0], 2)
        + Math.pow(entity_sprite.pos[1] - to_pos[1], 2));

    entity_sprite.flip(entity_sprite.pos[0] - to_pos[0] > 0);

    entity_sprite.pos = to_pos; // possible not save solution
    entity_sprite.bringToTop();

    var new_x = to_pos[0] * field_size + field_size / 2;
    var new_y = to_pos[1] * field_size + field_size / 2;

    game.add.tween(entity_sprite.position).to({x: new_x, y: new_y}, distance * 200,
        Phaser.Easing.Linear.None, true, 0);
};

shoot_base_handler = function (animation_data, bullet_key, explosion_key) {
    var from_index = animation_data[1];
    var to_index = animation_data[2];

    var from_pos = index_to_pos(from_index);
    var to_pos = index_to_pos(to_index);

    var bullet = game.add.sprite(i * field_size, j * field_size, bullet_key);
    bullet.anchor.set(0.5);
    // bullet->setFlippedX(from_pos.x - to_pos.x > 0);
};


// extract(data, from_index, to_index);
//
// auto from_pos = board_index_to_point(from_index);
// auto to_pos = board_index_to_point(to_index);
// from_pos.x += 30;
// from_pos.y += 30;
// to_pos.x += 30;
// to_pos.y += 30;
//
// auto bullet = new oxygine::Sprite;
// bullet->setAnchor(0.5, 0.5);
// bullet->setPosition(from_pos);
// bullet->attachTo(oxygine::getStage());
// bullet->setResAnim(res::ui.getResAnim(get_bullet_bitmap()));
// bullet->setTouchEnabled(false);
//
//
// auto distance = std::sqrt(std::pow(from_pos.x - to_pos.x, 2) + std::pow(from_pos.y - to_pos.y, 2));
//
// spTweenQueue bullet_twin = new TweenQueue;
// bullet_twin->add(Actor::TweenPosition(to_pos),  distance * 2.2);
// if (!get_explosion_bitmap().empty()) {
//     bullet_twin->add(TweenAnim(res::ui.getResAnim(get_explosion_bitmap())), 200);
// }
// bullet_twin->detachWhenDone();
// bullet->addTween(bullet_twin);
//
// animations_service::set_tween(bullet_twin);


animation.initialize = function () {
    animation.services = {};
    animation.services['move'] = move_handler;

};

animation.handle = function (animation_data) {
    var animation_name = animation_data[0];
    console.log("animation_name: " + animation_name);

    animation.services[animation_name](animation_data);
};

