FROM rust:1.81

# Install build tools and dependencies for Tree-sitter and Rust
RUN apt-get update && apt-get install -y nodejs npm build-essential 

# Verify that Cargo and Rust are installed
RUN cargo --version && rustc --version
RUN cargo install tree-sitter-cli

# Create a directory for the Tree-sitter project
WORKDIR /usr/src/tree-sitter-test

# Automatically initialize npm without prompting for input
RUN npm init -y

# Install necessary dependencies for Tree-sitter
RUN npm install --save nan

# Copy your grammar files into the container (if any exist in the local context)
COPY . .

RUN tree-sitter generate
RUN tree-sitter parse test
# Start a bash shell by default
CMD ["bash"]
