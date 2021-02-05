import * as frontity from "frontity";

// Save the reference to the original `fetch`.
const originalFetch = frontity.fetch;

// Send the requested URL to a backend.
const saveRequest = (backend, args) => {
  originalFetch(backend, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ url: args[0], options: args[1] }),
  });
};

export default () => {
  return {
    name: "@strattic/frontity",
    actions: {
      strattic: {
        init: ({ state }) => {
          // Replace the original `fetch` function with a wrapper.
          frontity.fetch = (...args) => {
            // Console.log all the fetched URLs.
            console.log(args);

            // If there is a setting defined with a backend URL, send a
            // request with the fetch information.
            if (state.strattic.backend)
              saveRequest(state.strattic.backend, args);

            // Finally, do the normal request.
            return originalFetch(...args);
          };
        },
      },
    },
  };
};
