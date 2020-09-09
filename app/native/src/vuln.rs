pub struct Check<'a> {
    /* points need to be signed for negative checks (introducing vulnerabilities not preexisting
    on the system) */
    points: isize,
    check_type: CheckType<'a>
}

/* btw, i'm really bad at cryptography. many of the algorithms done are based off of what
 shiversoft has recommended me and i've probably made many mistakes. if you find anything, please
 report an issue on gh and i'll do my best to fix it! */
pub enum CheckType<'a> {
    /*
    Secure File Contains: Check if a file contains a string without knowing the string.

    assume we have 2 strings, S and V, where V is a substring of S. when given S, we can determine
    V, but without S it should be extremely difficult to find V. let's impose some restrictions on
    ourselves so our algorithm is secure.
        enumerate V (needed for decoding success message) when given S in O(n) time
        without S, figuring out V should take exponential time or worse, k^O(n), hopefully enough
        so it's not worth the time of anyone to find V
    First, what information should we store about V? We should ensure the information stored does
    not allow V to be found, but when combined with S, is a lot easier to find. I opted for storing
    a hash of V and the length of V, meaning that bruteforcing V would require (assuming printable
    ascii) 95^len(V) hashes to compute. i use bcrypt for hashing, since that will amplify the

     */
    FileContains { file: String, hash: [u8; 32], plain_len: usize, message: &'a [u8] }
}