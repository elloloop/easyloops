# Memory Management in Computers

## Overview of Memory Management

Memory management in computers involves the efficient allocation, use, and deallocation of system memory to support applications, operating systems, and data types like images, videos, and text files. It ensures processes have sufficient memory while preventing conflicts, optimizing performance, and addressing the limitations of system architecture (32-bit or 64-bit). This wiki explores memory management principles, focusing on 32-bit and 64-bit systems, and how they handle data types, with a detailed look at pixels for images.

## Number Systems and Numerical Limits

### Decimal Number System

The decimal system, used in everyday calculations, has 10 digits (0–9) with place values based on powers of 10. For example, 123 = (1 × 10^2) + (2 × 10^1) + (3 × 10^0) = 100 + 20 + 3.

### Binary Number System

Computers store data in binary, using two digits (0 and 1) with place values based on powers of 2. For example, binary 1101 = (1 × 2^3) + (1 × 2^2) + (0 × 2^1) + (1 × 2^0) = 8 + 4 + 0 + 1 = 13 in decimal. Key units include:

- **Bit**: 0 or 1.
- **Byte**: 8 bits, representing 2^8 = 256 values (0–255).
- **Kilobyte (KB)**: 1024 bytes.
- **Megabyte (MB)**: 1024 KB = 1,048,576 bytes.
- **Gigabyte (GB)**: 1024 MB = 1,073,741,824 bytes.
- **Terabyte (TB)**: 1024 GB = 1,099,511,627,776 bytes.

### Numerical Limits

The number of bits determines data ranges and memory addressing:

- **8-bit data**: 0 to 255 (2^8 - 1).
- **16-bit data**: 0 to 65,535 (2^16 - 1).
- **32-bit addressing**: Supports 2^32 = 4,294,967,296 bytes (4 GB).
- **64-bit addressing**: Supports 2^64 = 18,446,744,073,709,551,616 bytes (16 exabytes), with practical limits lower due to hardware and OS constraints.

## Memory Management in 32-bit and 64-bit Systems

### 32-bit Systems

A 32-bit system uses 32-bit memory addresses, limiting addressable memory to 4 GB (2^32 bytes). Key characteristics:

- **Address Space**: Split between user processes (2–3 GB) and the OS kernel (1–2 GB), depending on the OS (e.g., Windows, Linux).
- **Limitations**: Large datasets (e.g., 8K videos, ~27.809 GB raw for 10 seconds) exceed the limit, requiring memory-mapped files or compression.
- **Data Alignment**: Aligned to 4-byte boundaries, adding padding (e.g., a 1-byte pixel may use 4 bytes in some structures).
- **Virtual Memory**: Uses 4 KB pages to map virtual to physical memory, with swap space on disk extending capacity but slowing performance.
- **Constraints**: Multiple large processes (e.g., video editing with 1 GB buffers) may exhaust the 4 GB limit, causing crashes or heavy swapping.

### 64-bit Systems

A 64-bit system uses 64-bit addresses, supporting 16 exabytes (2^64 bytes), with practical limits (e.g., 128 TB) due to hardware/OS constraints. Key characteristics:

- **Address Space**: Handles multiple large datasets (e.g., 4K video editing, large text corpora) natively.
- **Pointer Overhead**: 8-byte pointers (vs. 4 bytes in 32-bit) increase memory for data structures.
- **Data Alignment**: Aligned to 8-byte boundaries, adding padding for smaller data types.
- **Virtual Memory**: Supports larger page tables (4 KB or 2 MB pages), improving efficiency for large datasets.
- **Advantages**: Processes high-resolution multimedia or large datasets without swapping.

### Comparison

| Feature                | 32-bit System                         | 64-bit System                        |
| ---------------------- | ------------------------------------- | ------------------------------------ |
| Addressable Memory     | 4 GB                                  | 16 exabytes (practical limits lower) |
| Pointer Size           | 4 bytes                               | 8 bytes                              |
| Typical Page Size      | 4 KB                                  | 4 KB or 2 MB                         |
| Large Dataset Handling | Limited, needs memory-mapped files    | Handles natively                     |
| Performance            | Slower for large data due to swapping | Faster for large data                |

## Memory Allocation Strategies

### Stack vs. Heap Allocation

- **Stack Allocation**: For small, short-lived data (e.g., function variables). Limited size (1–8 MB), unsuitable for large images, videos, or text files.
- **Heap Allocation**: For dynamic, large data (e.g., image buffers, video frames). Managed by malloc/free (C) or new/delete (C++). 64-bit systems handle larger heap allocations efficiently.
- **Memory-Mapped Files**: Maps large files (e.g., videos) into virtual memory, loading only needed portions into RAM, critical for 32-bit systems.

### Virtual Memory and Paging

Virtual memory maps process addresses to physical RAM or disk (swap space):

- **Page Tables**: Map virtual to physical addresses. 32-bit systems have smaller tables, limiting mappings. 64-bit systems support larger tables but use more memory.
- **Page Faults**: Trigger disk access (slow) when unmapped data is accessed. Minimized by efficient allocation.
- **Swap Space**: Extends memory to disk, more critical for 32-bit systems.

### Garbage Collection

High-level languages (e.g., Java, Python) use garbage collection to reclaim unused memory, reducing leaks but adding overhead. Manual management (C/C++) is preferred for multimedia performance.

## Memory Management for Data Types

### Pixels and Their Importance (for Images and Videos)

A **pixel** (picture element) is the smallest unit of a digital image or video frame, representing a single point of color or intensity. Pixels are critical because they:

- **Define Visual Content**: Each pixel stores color or grayscale data, collectively forming images or video frames.
- **Determine Quality**: More pixels (higher resolution) provide sharper details but increase memory usage.
- **Impact Processing**: Pixel data affects memory allocation, rendering speed, and compression efficiency.
- **Enable Display**: Screens render pixels to display images/videos, with pixel density (e.g., PPI, pixels per inch) affecting perceived quality.

#### How Pixels Store Colors

The number of colors a pixel can store depends on its **bit depth** (bits per channel) and **color model**:

- **Grayscale**: Uses 1 byte (8 bits) per pixel, storing 2^8 = 256 intensity levels (0 = black, 255 = white).
- **RGB (Red, Green, Blue)**: Uses 3 bytes (24 bits) per pixel, with 8 bits per channel. Each channel has 256 levels (0–255), supporting 256^3 = 16,777,216 colors (true color).
- **RGBA**: Adds an alpha channel (transparency), using 4 bytes (32 bits) per pixel, maintaining the same color range as RGB.
- **High Dynamic Range (HDR)**: Uses 16 bits per channel (6 bytes for RGB, 8 bytes for RGBA), supporting 2^16 = 65,536 levels per channel, for 65,536^3 ≈ 281 trillion colors, offering finer gradients for professional imaging.
- **YUV (used in videos)**: Separates luminance (Y) and chrominance (U, V). YUV420 subsamples chrominance, averaging ~1.5 bytes per pixel, reducing memory while maintaining quality.
- **Reduced Bit Depth**: Using 4 bits per channel (12 bits total for RGB) supports 16^3 = 4,096 colors, saving memory but limiting color fidelity.

#### Memory Impact

The bit depth determines memory per pixel:

- Grayscale (8 bits): 1 byte/pixel.
- RGB (24 bits): 3 bytes/pixel.
- RGBA (32 bits): 4 bytes/pixel.
- HDR RGB (48 bits): 6 bytes/pixel.
- YUV420: ~1.5 bytes/pixel.

Higher bit depths increase color accuracy but consume more memory, impacting allocation and processing in both 32-bit and 64-bit systems.

### Images

Images are grids of pixels, with memory usage depending on resolution, pixel format, and compression.

#### Resolution and Memory

Raw size: \(\text{Size (Bytes)} = \text{Width} \cdot \text{Height} \cdot \text{Bytes per Pixel}\).

| Resolution | Pixels     | RGB Size (Bytes) | RGB Size (MB) |
| ---------- | ---------- | ---------------- | ------------- |
| 360p       | 230,400    | 691,200          | ~0.66 MB      |
| 720p       | 921,600    | 2,764,800        | ~2.64 MB      |
| 1080p      | 2,073,600  | 6,220,800        | ~5.93 MB      |
| 4K         | 8,294,400  | 24,883,200       | ~23.72 MB     |
| 8K         | 33,177,600 | 99,532,800       | ~94.91 MB     |

#### Compression

- **JPEG (Lossy)**: A 1080p image (5.93 MB raw) compresses to 0.5–2 MB.
- **PNG (Lossless)**: Typically 2–4 MB for 1080p.
- **WebP**: Balances lossy/lossless, often smaller than PNG.

### Videos

Videos are sequences of image frames, with memory depending on resolution, pixel format, frame rate, duration, and compression.

#### Resolution and Memory

Raw size: \(\text{Size (Bytes)} = \text{Width} \cdot \text{Height} \cdot \text{Bytes per Pixel} \cdot \text{Frame Rate} \cdot \text{Duration}\).

For 10-second RGB video at 30 fps:

| Resolution | Pixels     | Size for 10s (Bytes) | Size (MB)    | Size (GB)  |
| ---------- | ---------- | -------------------- | ------------ | ---------- |
| 360p       | 230,400    | 207,360,000          | ~197.75 MB   | ~0.193 GB  |
| 720p       | 921,600    | 829,440,000          | ~790.98 MB   | ~0.772 GB  |
| 1080p      | 2,073,600  | 1,866,240,000        | ~1779.79 MB  | ~1.738 GB  |
| 4K         | 8,294,400  | 7,464,960,000        | ~7120.61 MB  | ~6.954 GB  |
| 8K         | 33,177,600 | 29,859,840,000       | ~28477.27 MB | ~27.809 GB |

#### Compression

- **H.264 (Lossy)**: Compresses 1080p 10s video (1.738 GB raw) to 10–50 MB.
- **H.265/HEVC**: ~50% smaller than H.264.
- **AV1**: Slightly smaller than HEVC, open-source.

### Text Files

Text files are lightweight:

- **ASCII**: 1 byte per character. A 1 MB file holds ~1,048,576 characters.
- **UTF-8**: 1–4 bytes per character. A 10,000-word document (~60,000 characters) uses ~60–240 KB.
- **Compression**: Gzip reduces text by 60–80% (e.g., 60 KB to ~12–24 KB).

## Memory Calculations for a 5 MB File

- **Image (5 MB)**:
  - Uncompressed RGB: 5,000,000 bytes ÷ 3 ≈ 1,666,667 pixels (~1280 × 1302, ~720p).
  - JPEG: A 1080p image (5.93 MB raw) compresses to ~5 MB.
- **Video (5 MB)**:
  - H.264: A 360p video, 30 fps, ~1s (207,360,000 bytes raw) compresses to ~5 MB at 500 kbps.
- **Text (5 MB)**:
  - ASCII: ~5,242,880 characters (~1 million words).
  - Gzip: A 25 MB text file compresses to ~5 MB.

## Performance Considerations

### Factors Affecting Memory Usage

- **Data Size**: Videos > Images > Text in raw size.
- **Pixel Format/Resolution**: Higher bit depths (e.g., HDR) and resolutions increase memory.
- **Compression**: Reduces size but adds processing overhead.
- **System Architecture**: 32-bit systems struggle with large datasets; 64-bit systems handle them efficiently.
- **Allocation**: Heap and memory-mapped files are critical for large data.

### 32-bit vs. 64-bit Performance

- **32-bit**: Limited to 4 GB, causing swapping for large videos (e.g., 4K, 6.954 GB for 10s). Padding increases overhead.
- **64-bit**: Handles large datasets natively, but 8-byte pointers increase memory for structures.

## Best Practices for Memory Management

- **Optimize Data Size**: Use lower resolutions, efficient formats (Grayscale, YUV420, ASCII).
- **Use Compression**: JPEG/H.264 for multimedia, Gzip for text.
- **Leverage Virtual Memory**: Memory-mapped files for large datasets in 32-bit systems.
- **Choose 64-bit Systems**: For large multimedia or datasets.
- **Monitor Allocation**: Prevent leaks with proper deallocation or garbage collection.

## Related Concepts

- [[wiki:memory-allocation]] - Stack, heap, and memory-mapped files
- [[wiki:virtual-memory]] - Paging and address translation
- [[wiki:pixel-structures]] - Pixel formats and color depth
- [[wiki:image-compression]] - Lossy/lossless image compression
- [[wiki:video-compression]] - Video codecs and temporal compression
- [[wiki:binary-arithmetic]] - Binary operations for data processing
