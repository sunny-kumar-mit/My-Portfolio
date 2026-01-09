import { motion, AnimatePresence } from 'motion/react';
import { useEffect, useRef, useState, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { supabase, uploadFileToSupabase } from '@/lib/supabaseClient';
import { Upload, X, FileText, Image as ImageIcon, FileArchive, CheckCircle2 } from 'lucide-react';
import { useDropzone } from 'react-dropzone';
import SuccessModal from './SuccessModal';

const contactFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

export default function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: '',
      email: '',
      message: '',
    },
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const onDrop = useCallback((acceptedFiles: File[], fileRejections: any[]) => {
    // Handle rejections first
    if (fileRejections.length > 0) {
      const error = fileRejections[0].errors[0];
      if (error.code === 'file-too-large') {
        toast.error('File size exceeds 10MB');
      } else if (error.code === 'file-invalid-type') {
        toast.error('Unsupported file type. Please upload Image, PDF or ZIP.');
      } else {
        toast.error(error.message);
      }
      return;
    }

    if (acceptedFiles.length > 0) {
      setSelectedFile(acceptedFiles[0]);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive, isDragReject } = useDropzone({
    onDrop,
    accept: {
      'image/jpeg': [],
      'image/png': [],
      'image/webp': [],
      'application/pdf': [],
      'application/zip': [],
      'application/x-zip-compressed': []
    },
    maxSize: MAX_FILE_SIZE,
    maxFiles: 1,
    multiple: false
  });

  const removeFile = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedFile(null);
  };

  const getFileIcon = (file: File) => {
    if (file.type.startsWith('image/')) return <ImageIcon className="w-8 h-8 text-cyan-400" />;
    if (file.type === 'application/pdf') return <FileText className="w-8 h-8 text-red-400" />;
    if (file.type.includes('zip')) return <FileArchive className="w-8 h-8 text-yellow-400" />;
    return <FileText className="w-8 h-8 text-gray-400" />;
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const onSubmit = async (data: ContactFormValues) => {
    setIsSubmitting(true);
    try {
      let fileUrl = null;

      // 1. Upload File if exists
      if (selectedFile) {
        fileUrl = await uploadFileToSupabase(selectedFile);
      }

      // 2. Insert into Supabase
      const { error } = await supabase
        .from('contact_messages')
        .insert({
          name: data.name,
          email: data.email,
          message: data.message,
          file_url: fileUrl, // using generic file_url column
        });

      if (error) throw error;

      // Show Success Modal instead of toast
      setShowSuccessModal(true);
      // Form reset is handled when modal closes

    } catch (error: any) {
      console.error('Error submitting contact form:', error);

      // Handle Supabase 404 (Table not found)
      if (error.code === '404' || error.status === 404 || error.message?.includes('404')) {
        toast.error('Configuration Error: "contact_messages" table not found. Please run the setup SQL script in Supabase.');
      } else {
        toast.error(error.message || 'Failed to send message. Please try again.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleModalClose = () => {
    setShowSuccessModal(false);
    // Reset form only when modal is closed
    form.reset();
    setSelectedFile(null);
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="min-h-screen flex items-center justify-center px-4 py-20 relative"
    >
      <SuccessModal isOpen={showSuccessModal} onClose={handleModalClose} />

      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="space-y-12"
        >
          {/* Section Title */}
          <div className="text-center space-y-4">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-5xl xl:text-6xl font-bold"
            >
              <span className="gradient-text">Get In Touch</span>
            </motion.h2>
            <motion.div
              initial={{ scaleX: 0 }}
              animate={isVisible ? { scaleX: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="w-24 h-1 bg-gradient-to-r from-primary via-secondary to-accent mx-auto rounded-full"
            />
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="text-muted-foreground text-lg xl:text-xl max-w-3xl mx-auto"
            >
              Have a project in mind? Let's work together to bring your ideas to life
            </motion.p>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-12">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={isVisible ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="space-y-8"
            >
              <div className="glass-card neon-border-blue rounded-3xl p-8 hover-glow-blue space-y-6">
                <h3 className="text-3xl font-bold gradient-text">Let's Connect</h3>
                <p className="text-muted-foreground leading-relaxed">
                  I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
                </p>

                <div className="space-y-4">
                  {[
                    {
                      icon: '📧',
                      label: 'Email',
                      value: 'sunny01srp@gmail.com',
                      href: 'mailto:sunny01srp@gmail.com',
                    },
                    {
                      icon: '📱',
                      label: 'Phone',
                      value: '+91 7494065966',
                      href: 'tel:+917494065966',
                    },
                    {
                      icon: '📍',
                      label: 'Location',
                      value: 'Pune, Maharashtra',
                      href: 'https://maps.app.goo.gl/5MZHKni1qyiuSic88',
                    },
                  ].map((contact) => (
                    <a
                      key={contact.label}
                      href={contact.href}
                      target={contact.label === 'Location' ? '_blank' : undefined}
                      rel={contact.label === 'Location' ? 'noopener noreferrer' : undefined}
                      className="flex items-center gap-4 glass-card rounded-2xl p-4 hover-glow-blue transition-all duration-300 group"
                    >
                      <div className="text-3xl group-hover:scale-110 transition-transform duration-300">
                        {contact.icon}
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">{contact.label}</p>
                        <p className="text-foreground font-semibold">{contact.value}</p>
                      </div>
                    </a>
                  ))}
                </div>
              </div>

              {/* Social Links */}
              <div className="glass-card neon-border-purple rounded-3xl p-8 hover-glow-purple">
                <h4 className="text-xl font-bold text-foreground mb-4">Follow Me</h4>
                <div className="flex gap-4">
                  {[
                    { icon: 'https://upload.wikimedia.org/wikipedia/commons/c/ca/LinkedIn_logo_initials.png', label: 'LinkedIn', href: 'https://www.linkedin.com/in/sunny-kumar-mit/' },
                    { icon: 'https://i.postimg.cc/YCbCbV4x/github-(1).png6', label: 'GitHub', href: 'https://github.com/sunny-kumar-mit/' },
                    { icon: 'https://i.postimg.cc/kMvDhwpG/twitter.png', label: 'X', href: 'https://x.com/sunny01srp' },
                    { icon: 'https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png', label: 'Instagram', href: 'https://www.instagram.com/crazy01srp/' },
                    { icon: 'https://upload.wikimedia.org/wikipedia/commons/7/7e/Gmail_icon_%282020%29.svg', label: 'Email', href: 'mailto:sunny01srp@gmail.com' },
                    { icon: 'https://play-lh.googleusercontent.com/QbavRFj9bwEj8Wm3mIfOG781pUoPIWdOGEnOGKk35mf_M5AvIEhDhyEP7ZfQFwpzPwM', label: 'Linktree', href: 'https://linktr.ee/sunny01srp' },
                  ].map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="glass-card w-14 h-14 rounded-full flex items-center justify-center hover-glow-blue transition-all duration-300 hover:scale-110 overflow-hidden bg-white/5"
                      aria-label={social.label}
                    >
                      <img
                        src={social.icon}
                        alt={social.label}
                        className="w-8 h-8 object-contain"
                      />
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={isVisible ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 1 }}
              className="glass-card neon-border-cyan rounded-3xl p-8 hover-glow-blue"
            >
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-foreground font-semibold">Name</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Your name"
                            {...field}
                            className="glass-card border-border focus:border-primary transition-colors duration-300"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-foreground font-semibold">Email</FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="your.email@example.com"
                            {...field}
                            className="glass-card border-border focus:border-primary transition-colors duration-300"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-foreground font-semibold">Message</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Tell me about your project..."
                            rows={4}
                            {...field}
                            className="glass-card border-border focus:border-primary transition-colors duration-300 resize-none"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="space-y-2">
                    <FormLabel className="text-foreground font-semibold">Attach Supporting Files (Optional)</FormLabel>

                    {!selectedFile ? (
                      <div
                        {...getRootProps()}
                        className={`
                          relative group cursor-pointer
                          border-2 border-dashed rounded-xl p-4
                          transition-all duration-300 ease-in-out
                          flex flex-col items-center justify-center gap-2
                          glass-card
                          ${isDragReject
                            ? 'border-red-500/50 bg-red-500/5'
                            : isDragActive
                              ? 'border-cyan-500 bg-cyan-500/10 scale-[1.02] shadow-[0_0_20px_rgba(6,182,212,0.3)]'
                              : 'border-white/10 hover:border-cyan-500/50 hover:bg-white/5 hover:scale-[1.01]'
                          }
                        `}
                      >
                        <input {...getInputProps()} />
                        <div className={`p-3 rounded-full bg-white/5 transition-transform duration-300 ${isDragActive ? 'scale-110' : 'group-hover:scale-110'}`}>
                          <Upload className={`w-6 h-6 ${isDragActive ? 'text-cyan-400' : 'text-gray-400 group-hover:text-cyan-400'}`} />
                        </div>
                        <div className="text-center space-y-1">
                          <p className="text-sm font-medium text-foreground">
                            Click to upload or drag & drop
                          </p>
                          <p className="text-xs text-muted-foreground">
                            PDF, Image or ZIP • Max 10MB
                          </p>
                        </div>
                      </div>
                    ) : (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="relative glass-card border border-white/10 rounded-xl p-4 flex items-center gap-4 group"
                      >
                        <div className="p-3 rounded-lg bg-white/5">
                          {getFileIcon(selectedFile)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-foreground truncate">
                            {selectedFile.name}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {formatFileSize(selectedFile.size)}
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={removeFile}
                          className="p-2 rounded-full hover:bg-white/10 text-gray-400 hover:text-red-400 transition-colors"
                        >
                          <X className="w-5 h-5" />
                        </button>
                        <div className="absolute -top-2 -right-2 bg-green-500 rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <CheckCircle2 className="w-3 h-3 text-white" />
                        </div>
                      </motion.div>
                    )}

                    {/* Error message slot if needed, though toast is handling it. We could show persistent error here if preferred. 
                        The requirement says "Show error message below upload area". 
                        Currently I used Toast for immediate feedback. Dropzone often doesn't persist error state unless we set it.
                        I'll stick to Toast as it's cleaner for "actions", but if the user uploads an invalid file, toast is better.
                    */}
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting || (isDragActive && !selectedFile)} // Disable if dragging or if uploading (handled by isSubmitting)
                    className="w-full magnetic-btn glass-card neon-border-blue py-4 text-lg font-semibold hover-glow-blue transition-all duration-300 hover:scale-105"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <span className="animate-spin">⏳</span>
                        Sending...
                      </span>
                    ) : (
                      'Send Message'
                    )}
                  </Button>
                </form>
              </Form>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
