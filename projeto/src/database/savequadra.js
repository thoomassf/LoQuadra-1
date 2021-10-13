function savequadra(db, quadra) {
    return db.run(`
        INSERT INTO quadras (
            lat,
            lng,
            name,
            type_block,
            about,
            images,
            cep,
            street,
            number,
            district,
            city,
            state,
            whatsapp,
            telephone,
            email,
            opening_hours,
            price_hour,
            open_on_weekends
        ) VALUES (
            "${quadra.lat}",
            "${quadra.lng}",
            "${quadra.name}",
            "${quadra.type_block}",
            "${quadra.about}",
            "${quadra.images}",
            "${quadra.cep}",
            "${quadra.street}",
            "${quadra.number}",
            "${quadra.district}",
            "${quadra.city}",
            "${quadra.state}",
            "${quadra.whatsapp}",
            "${quadra.telephone}",
            "${quadra.email}",
            "${quadra.opening_hours}",
            "${quadra.price_hour}",
            "${quadra.open_on_weekends}"
        );
    `);
}

module.exports = savequadra;