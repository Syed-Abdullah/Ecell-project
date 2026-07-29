const API_BASE = '/api';

export async function fetchProducts(category = 'All', searchQuery = '') {
  try {
    const params = new URLSearchParams();
    if (category && category !== 'All') params.append('category', category);
    if (searchQuery) params.append('q', searchQuery);

    const res = await fetch(`${API_BASE}/products?${params.toString()}`);
    if (!res.ok) throw new Error('Failed to fetch products');
    return await res.json();
  } catch (err) {
    console.error('API Error:', err);
    throw err;
  }
}

export async function fetchServices() {
  try {
    const res = await fetch(`${API_BASE}/services`);
    if (!res.ok) throw new Error('Failed to fetch software services');
    return await res.json();
  } catch (err) {
    console.error('API Error:', err);
    throw err;
  }
}

export async function submitServiceBooking(data) {
  try {
    const res = await fetch(`${API_BASE}/service-requests`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      const errData = await res.json();
      throw new Error(errData.error || 'Failed to submit service request');
    }
    return await res.json();
  } catch (err) {
    console.error('API Error:', err);
    throw err;
  }
}

export async function fetchServiceRequests() {
  try {
    const res = await fetch(`${API_BASE}/service-requests`);
    if (!res.ok) throw new Error('Failed to fetch requests');
    return await res.json();
  } catch (err) {
    console.error('API Error:', err);
    throw err;
  }
}
