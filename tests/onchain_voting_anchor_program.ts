import * as anchor from "@project-serum/anchor";
import { Program } from "@project-serum/anchor";
import { OnchainVotingAnchorProgram } from "../target/types/onchain_voting_anchor_program";

describe("onchain_voting_anchor_program", () => {
    // Configure the client to use the local cluster.
    anchor.setProvider(anchor.AnchorProvider.env());

    const program = anchor.workspace
        .OnchainVotingAnchorProgram as Program<OnchainVotingAnchorProgram>;

    let voteBank = anchor.web3.Keypair.generate();

    it("Creating proposal!", async () => {
        const tx = await program.methods
            .initialize("Proposal description")
            .accounts({
                voteAccount: voteBank.publicKey,
            })
            .signers([voteBank])
            .rpc();
        console.log("Your transaction signature", tx);
    });

    it("Voting for yes.", async () => {
        const tx = await program.methods
            .giveVote("YES")
            .accounts({
                voteAccount: voteBank.publicKey,
            })
            .rpc();

        console.log("Your transaction signature", tx);

        let voteBankData = await program.account.proposal.fetch(
            voteBank.publicKey
        );
        console.log(`Total Yes count: ${voteBankData.yes}`);
        console.log(`Total No count: ${voteBankData.no}`);
    });

    it("Voting for no.", async () => {
        const tx = await program.methods
            .giveVote("NO")
            .accounts({
                voteAccount: voteBank.publicKey,
            })
            .rpc();

        console.log("Your transaction signature", tx);

        let voteBankData = await program.account.proposal.fetch(
            voteBank.publicKey
        );
        console.log(`Total Yes count: ${voteBankData.yes}`);
        console.log(`Total No count: ${voteBankData.no}`);
    });
});
