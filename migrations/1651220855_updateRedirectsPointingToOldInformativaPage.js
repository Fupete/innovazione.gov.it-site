"use strict";
const util = require("util");

module.exports = async (client) => {
  // Find old informativa record
  const [oldInformativa] = await client.items.all({
    filter: {
      type: "department_subpage",
      fields: {
        slug: {
          eq: "informativa-trattamento-dati-personali-candidati",
        },
      },
    },
  });

  // Find redirect record to update
  const redirectsToOldInformativa = await client.items.all({
    filter: {
      type: "resource_redirect",
      fields: {
        link: {
          eq: oldInformativa.id,
        },
      },
    },
  });

  const redirectsIds = redirectsToOldInformativa.map((r) => r.id);

  // Find new informativa record
  const [destinationRecord] = await client.items.all({
    filter: {
      type: "innovate_subpage",
      fields: {
        slug: {
          eq: "informativa-trattamento-dati",
        },
      },
    },
  });

  const newDestinationId = destinationRecord.id;

  // Publish new innovate record
  //const publishedDestination = await client.item.publish(destinationRecord.id, {
  //recursive: true,
  //});

  // Update redirect record
  redirectsIds.forEach(async (id) => {
    const updated = await client.items.update(id, {
      link: newDestinationId,
    });
  });
};
